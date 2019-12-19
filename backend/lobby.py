import socketio
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore, secret, getSessionByCode
from JSONObject.user import User
from jose import jwt
from functools import wraps
from auth import auth_required
from JSONObject.session import Session
import json

session = Blueprint('session', __name__)

sio = socketio.Server(logger=False, async_mode='threading', cors_allowed_origins='*')

@sio.on('message')
def message(sid, data):
    sio.emit('message', data, room=sio.get_session(sid)['room'], skip_sid=sid)
    pass

@sio.on('join')
def join(sid, data, username):
    sio.enter_room(sid, data, username)
    sio.save_session(sid, {'username': username, 'room': data})
    sio.emit('connect', username, room=data, skip_sid=sid)

@sio.event
def connect(sid, environ):
    # TODO Update datastore participants
    print('Connected', sid)

@sio.event
def disconnect(sid):
    sio.emit('disconnect', sio.get_session(sid)['username'], room=sio.get_session(sid)['room'], skip_sid=sid)
    sio.save_session(sid, { })

@session.route('/<int:id>')
@auth_required
def getSession(id):
    room = get(id, 'session')

    if not request.id in room.get('participants'):
        return make_response(jsonify(code='You need to enter the code to access this room'), 400)

    return make_response(jsonify(id=id, hostId=room.get('hostId'), title=room.get('title'), location=room.get('location'), 
            duration=room.get('duration'), starttime=room.get('starttime'), endtime=room.get('endtime'), votingtime=room.get('votingtime'), 
            weekends=room.get('weekends'), participants=room.get('participants')), 200)

@session.route('/join', methods=['POST'])
@auth_required
def joinSession():
    data = request.get_json()
    
    code = data.get('code')
   
    errors = {}
    if(code is None): errors['code'] = 'Code is empty'

    if len(errors.keys()) == 0:
        room = getSessionByCode(code)
        if len(room) == 0:
            return make_response(jsonify(username='Room does not exist'), 400)
        else:
            room = from_datastore(room[0])
            if not request.id in room['participants']:
                room['participants'].append(request.id)
                update(room, 'session', room.get('id'))
            return make_response(jsonify(id=room.get('id'), hostId=room.get('hostId'), title=room.get('title'), location=room.get('location'), 
            duration=room.get('duration'), starttime=room.get('starttime'), endtime=room.get('endtime'), votingtime=room.get('votingtime'), 
            weekends=room.get('weekends'), participants=room.get('participants')), 200)
    else: 
        return make_response(jsonify(errors=errors), 400)

@session.route('/host', methods=['POST'])
@auth_required
def hostSess():
    data = request.get_json()
    if data is None: 
        return make_response('No data was sent', 400)
    hostId = request.id
    title = data.get('title')
    location = data.get('location')
    duration = data.get('duration')
    starttime = data.get('starttime')
    endtime = data.get('endtime')
    votingtime = data.get('votingtime')
    weekends = data.get('weekends')

    # TODO Validation 
    errors = {}
    if(title is None): errors['title'] = 'Title is empty'
    if(location is None): errors['location'] = 'Location is empty'
    if(duration is None): errors['duration'] = 'Duration is empty'
    if(starttime is None): errors['starttime'] = 'Start time is empty'
    if(endtime is None): errors['endtime'] = 'End time is empty'
    if(votingtime is None): errors['votingtime'] = 'Voting time is empty'
    if(weekends is None): errors['weekends'] = 'Weekends is empty'

    if len(errors.keys()) == 0:
        # TODO Sessions cannot generate the same code
        room = Session(hostId, title, location, duration, starttime, endtime, votingtime, weekends)
        update(room.__dict__, 'session')
        room = getSessionByCode(room.code) ## TODO Find a better way to extract session id than fetching it from db
        room = from_datastore(room[0])
        return make_response(jsonify(id=room.get('id'), hostId=hostId, title=title, location=location, duration=duration, starttime=starttime,
                endtime=endtime, votingtime=votingtime, weekends=weekends, participants=room.get('paprticipants')), 200)
    else:
        return make_response(jsonify(errors=errors.__dict__), 400)
