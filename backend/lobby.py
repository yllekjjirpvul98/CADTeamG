import socketio
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore, secret, getSessionByCode, getEventsByUserId, update_entity
from JSONObject.user import User
from jose import jwt
from functools import wraps
from auth import auth_required
from JSONObject.session import Session
import json
import threading
import datetime
from time import gmtime, strftime, sleep
from utils import generateTimeslots
from validation.lobby import validate_join_session, validate_host_session
from JSONObject.event import Event

lobby = Blueprint('session', __name__)

sio = socketio.Server(logger=False, async_mode='threading', cors_allowed_origins='*')

@lobby.route('/<int:id>')
@auth_required
def getSession(id):
    room = get(id, 'session')
    host = get(room.get('hostId'), 'user')

    if not request.id in room.get('participants'):
        return make_response(jsonify(code='You need to enter the code to access this room'), 400)

    if room.get('winner') is not None:
        sio.emit('result', room.get('winner'), room=id)

    return make_response(jsonify(id=id, code=room.get('code'), hostId=room.get('hostId'), title=room.get('title'), location=room.get('location'), 
            duration=room.get('duration'), starttime=room.get('starttime'), endtime=room.get('endtime'), votingtime=room.get('votingtime'), 
            weekends=room.get('weekends'), timeslots=room.get('timeslots'), winner=room.get('winner') or None,
            votingend=room.get('votingend') or None, participants=room.get('participants'), hostUsername=host.get('username')), 200)

@lobby.route('/join', methods=['POST'])
@auth_required
def joinSession():
    data = request.get_json()
    
    code = data.get('code')

    errors = validate_join_session(code)

    if len(errors.keys()) == 0:
        room = getSessionByCode(code)
        if len(room) == 0:
            return make_response(jsonify(id='Room does not exist'), 400)
        
        room = from_datastore(room[0])

        if room.get('votingend') is not None:
            return make_response(jsonify(id='Voting has already started in this room'))

        if request.id in room['participants']:
            return make_response(jsonify(id='You have already joined this room'))

        room['participants'].append(request.id)
        update(room, 'session', room.get('id'))
        sio.emit('enter', room=str(room.get('id')))
        
        return make_response(jsonify(id=room.get('id'), hostId=room.get('hostId'), title=room.get('title'), location=room.get('location'), 
        duration=room.get('duration'), starttime=room.get('starttime'), endtime=room.get('endtime'), votingtime=room.get('votingtime'), 
        weekends=room.get('weekends'), participants=room.get('participants')), 200)
    else: 
        return make_response(jsonify(errors=errors), 400)

@lobby.route('/host', methods=['POST'])
@auth_required
def hostSess():
    data = request.get_json()
    if data is None: 
        return make_response('No data was sent', 400)
    hostId = request.id
    title = data.get('title')
    location = data.get('location')
    starttime = data.get('starttime')
    endtime = data.get('endtime')
    duration = data.get('duration')
    votingtime = data.get('votingtime')
    weekends = data.get('weekends')

    errors = validate_host_session(title, location, starttime, endtime, duration, votingtime, weekends)

    if len(errors.keys()) == 0:
        # TODO Sessions cannot generate the same code

        room = Session(hostId, title, location, starttime, endtime, duration, votingtime, weekends)

        update(room.__dict__, 'session')
        room = getSessionByCode(room.code) ## TODO Find a better way to extract session id than fetching it from db
        room = from_datastore(room[0])
        return make_response(jsonify(id=room.get('id'), code=room.get('code'), hostId=hostId, title=title, location=location, starttime=starttime,
                endtime=endtime, hostUsername=room.get('hostUsername'), duration=duration, votingtime=votingtime, weekends=weekends, participants=room.get('participants')), 200)
    else:
        return make_response(jsonify(errors=errors), 400)

@lobby.route('/<int:id>/events')
@auth_required
def getSessionEvents(id):
    room = get(id, 'session')
    if room is None:
        return make_response(jsonify(id='Room does not exist'), 404)
    if not request.id in room.get('participants'):
        return make_response(jsonify(id='You need to enter the code to access this room'), 400)

    event_list = []
    for participant in room.get('participants'):
        events = getEventsByUserId(participant)
        if len(events) != 0: 
            for event in events:   
                event['id'] = event.id 
                event_list.append(event)

    return make_response(jsonify(events=event_list), 200)

@lobby.route('/<int:id>', methods=['DELETE'])
@auth_required
def deleteSession(id):
    room = get(id, 'session')
    if request.id == room.get('hostId'):
        delete('session', id)
        id=str(id)
        sio.emit('close', room=id)
        return make_response(jsonify(id=id), 200)     
    return make_response(jsonify(code='You need host permission to delete this room'), 400)

@lobby.route('/<int:id>', methods=['PUT'])
@auth_required
def leaveSession(id):
    data = request.get_json()
    userid = data.get('userid')
    
    if userid is None:
        return make_response(jsonify(id='No id was provided'), 400)

    room = get(id, 'session')
    user = get(userid, 'user')
    if room is None or user is None:
       return make_response(jsonify(id='Room does not exist'), 400)

    if userid not in room['participants']:
        return make_response(jsonify(id='You must be in the room before you leave it'), 400)

    room['participants'].remove(userid)
    updated = update(room, 'session', id)
    sio.emit('leaveLobby', json.dumps({ 'username': user.get('username'), 'id': userid }), room=str(id))
    return make_response(updated, 200)

@sio.event
def connect(sid, environ):
    print(sid + ' connects')

@sio.event
def disconnect(sid):
    try:
        user = sio.get_session(sid)
        sio.emit('leave', sio.get_session(sid).get('username'), room=user.get('room'), skip_sid=sid)
    except TypeError:
        pass
    except KeyError:
        pass
    sio.save_session(sid, None)

@sio.on('join')
def join(sid, room, username, userid):
    sio.enter_room(sid, room)
    sio.save_session(sid, {'username': username, 'room': room, 'id': userid })
    sio.emit('join', username, room=room, skip_sid=sid)

@sio.on('message')
def message(sid, msg):
    user = sio.get_session(sid)
    timestamp = strftime("%H:%M", gmtime())
    sio.emit('message', json.dumps({'message': msg, 'username': user.get('username'), 'time': timestamp }), room=user.get('room'))

@sio.on('start')
def start(sid, roomid):    
    time = datetime.datetime.now()
    user = sio.get_session(sid)
    room = get(roomid, 'session')
    
    if room is None:
        sio.emit('error', 'Room does not exist', room=sid)
        return

    if room.get('votingend') is not None:
        sio.emit('error', 'Voting has been already started', room=sid)
        return

    event_list = []
    for participant in room.get('participants'):
        events = getEventsByUserId(participant)
        if len(events) != 0: 
            for event in events:
                event['id'] = event.id 
                event_list.append(event)

    timeslots = generateTimeslots(room, event_list)


    room['votingend'] = time + datetime.timedelta(seconds=room.get('votingtime'))
    for timeslot in timeslots:
        room['timeslots'][timeslot] = []

    updated = update(room, 'session', user.get('room'))
    sio.emit('start', json.dumps({ 'votingend': str(updated.get('votingend')), 'timeslots': room['timeslots'] }), room=sio.get_session(sid)['room'])

    # Check results after votingtime
    sleep(room.get('duration'))
    room = get(roomid, 'session')

    votes = 0
    winner_votes = 0
    winner_timeslot = ''
    for key, id_list in room['timeslots'].items():
        votes += len(id_list)
        if len(id_list) > winner_votes:
            winner_votes = len(id_list)
            winner_timeslot = key

    if(votes >= len(room.get('participants'))) or votes == 0: return

    room['winner'] = winner_timeslot
    updated = update(room, 'session', user.get('room'))
    sio.emit('result', updated.get('winner'), user.get('room'))

    starttimeiso = datetime.datetime.strptime(updated.get('starttime'), "%Y-%m-%dT%H:%M:%S.%fZ")
    endtimeiso = datetime.datetime.strptime(updated.get('endtime'), "%Y-%m-%dT%H:%M:%S.%fZ") + datetime.timedelta(seconds=updated.get('votingtime'))
    event = Event(user.get('id'), user.get('username'), updated.get('title'), updated.get('location'), starttimeiso, endtimeiso)
    event = update(event.__dict__, 'event')
    print(event)

@sio.on('vote')
def vote(sid, timeslot):
    user = sio.get_session(sid)
    username = user.get('username')
    userid = user.get('id')

    if user is None:
        return sio.emit('error', 'Refresh the page', room=sid)

    room = get(user.get('room'), 'session')
    
    # Add vote to database
    try:
        for key, id_list in room['timeslots'].items():
            if username in id_list:
                return sio.emit('error', 'You have already voted', room=sid)
        room['timeslots'][timeslot] = room['timeslots'][timeslot] + [username]
    except KeyError:
        room['timeslots'][timeslot] = [username]

    updated = update(room, 'session', user.get('room'))
    sio.emit('vote', json.dumps({ 'username': username, 'timeslot': timeslot }), room=user.get('room'))

    # Calculate number of votes
    votes = 0
    for timeslot, id_list in updated['timeslots'].items():
        votes += len(id_list)

    if votes != len(updated.get('participants')): return

    # Determine winner
    winner_votes = 0
    winner_timeslot = ''
    for key, id_list in updated['timeslots'].items():
        votes += len(id_list)
        if len(id_list) > winner_votes:
            winner_votes = len(id_list)
            winner_timeslot = key

    room['winner'] = winner_timeslot
    updated = update(room, 'session', user.get('room'))
    sio.emit('result', updated.get('winner'), room=user.get('room'))

    starttimeiso = datetime.datetime.strptime(room.get('starttime'), "%Y-%m-%dT%H:%M:%S.%fZ")
    endtimeiso = datetime.datetime.strptime(room.get('endtime'), "%Y-%m-%dT%H:%M:%S.%fZ") + datetime.timedelta(seconds=room.get('votingtime'))
    event = Event(userid, username, room.get('title'), room.get('location'), starttimeiso, endtimeiso)
    event = update(event.__dict__, 'event')
    print(event)