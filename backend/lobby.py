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
from time import gmtime, strftime
<<<<<<< HEAD
from utils import generateTimeslots
=======
import maya
>>>>>>> 9339739c94dc208ecb2668d6503dbf81f62d32b6

lobby = Blueprint('session', __name__)

sio = socketio.Server(logger=False, async_mode='threading', cors_allowed_origins='*')

@lobby.route('/<int:id>')
@auth_required
def getSession(id):
    room = get(id, 'session')

    if not request.id in room.get('participants'):
        return make_response(jsonify(code='You need to enter the code to access this room'), 400)

    return make_response(jsonify(id=id, code=room.get('code'), hostId=room.get('hostId'), title=room.get('title'), location=room.get('location'), 
            duration=room.get('duration'), starttime=room.get('starttime'), endtime=room.get('endtime'), votingtime=room.get('votingtime'), 
            weekends=room.get('weekends'), timeslots=room.get('timeslots'), votes=room.get('votes'), 
            votingend=room.get('votingend') or None, participants=room.get('participants')), 200)

@lobby.route('/join', methods=['POST'])
@auth_required
def joinSession():
    data = request.get_json()
    
    code = data.get('code')

    errors = {}
    if(code is None): errors['code'] = 'Code is empty'

    if len(errors.keys()) == 0:
        room = getSessionByCode(code)
        if len(room) == 0:
            return make_response(jsonify(id='Room does not exist'), 400)
        else:
            room = from_datastore(room[0])

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

    # TODO Validation 
    errors = {}
    if(title is None): errors['title'] = 'Title is empty'
    if(location is None): errors['location'] = 'Location is empty'
    if(starttime is None): errors['starttime'] = 'Start time is empty'
    if(endtime is None): errors['endtime'] = 'End time is empty'
    if(duration is None): errors['duration'] = 'Duration is empty'
    if(votingtime is None): errors['votingtime'] = 'Voting time is empty'
    if(weekends is None): errors['weekends'] = 'Weekends is empty'

    if len(errors.keys()) == 0:
        # TODO Sessions cannot generate the same code

        room = Session(hostId, title, location, starttime, endtime, duration, votingtime, weekends)

        update(room.__dict__, 'session')
        room = getSessionByCode(room.code) ## TODO Find a better way to extract session id than fetching it from db
        room = from_datastore(room[0])
        return make_response(jsonify(id=room.get('id'), code=room.get('code'), hostId=hostId, title=title, location=location, starttime=starttime,
                endtime=endtime, duration=duration, votingtime=votingtime, weekends=weekends, participants=room.get('participants')), 200)
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

@sio.event
def connect(sid, environ):
    print(sid + ' connects')

@sio.event
def disconnect(sid):
    try:
        user = sio.get_session(sid)
        sio.emit('leave', sio.get_session(sid).get('username'), room=user.get('room'), skip_sid=sid)
        print(user.get('username') + ' disconnects from room ' + user.get('room'))
    except TypeError:
        pass
    except KeyError:
        pass
    sio.save_session(sid, None)

@sio.on('join')
def join(sid, room, username):
    sio.enter_room(sid, room)
    sio.save_session(sid, {'username': username, 'room': room})
    sio.emit('join', username, room=room, skip_sid=sid)
    print(username + ' joins ' + room)

@sio.on('message')
def message(sid, msg):
    user = sio.get_session(sid)
    timestamp = strftime("%H:%M", gmtime())
    sio.emit('message', json.dumps({'message': msg, 'username': user.get('username'), 'time': timestamp }), room=user.get('room'))
    print(user.get('username') + ' sends message "' + msg + '" to room ' + user.get('room'))

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
    room['timeslots'] = timeslots
    updated = update(room, 'session', user.get('room'))
    sio.emit('start', json.dumps({ 'votingend': str(updated.get('votingend')), 'timeslots': timeslots }), room=sio.get_session(sid)['room'])


@sio.on('vote')
def vote(sid, timeslot):
    user = sio.get_session(sid)
    room = get(user.get('room'), 'session')
    username = user['username']
    
    if username is None:
        sio.emit('error', 'You have been disconnected from the server for no fucking reason. Fuck websockets and your connection.', room=sid)
        return
    
    # Add vote to database
    try:
        for timeslot, username_list in room['votes'].items():
            if username in username_list:
                sio.emit('error', 'You have already voted', room=sid)
                return
        room['votes'][timeslot] = room['votes'][timeslot] + [username]
    except KeyError:
        room['votes'][timeslot] = [username]

    updated = update(room, 'session', user.get('room'))
    sio.emit('vote', json.dumps({ 'username': username, 'timeslot': timeslot }), room=user.get('room'))

    # Calculate number of votes
    votes = 0
    for timeslot, username_list in updated['votes'].items():
        votes += len(username_list)

    # Determine winner
    if votes >= len(updated.get('participants')):
        for timeslot, username_list in updated['votes'].items():
            # Determine the winner
            sio.emit('result', updated['votes'][timeslot] ,room=user['room'])
            break
