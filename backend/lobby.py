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
def test(sid, data):
    sio.emit('message', data, room=sio.get_session(sid)['room'], skip_sid=sid)
    pass

@sio.on('join')
def test(sid, data):
    sio.enter_room(sid, data)
    sio.save_session(sid, {'room': data})
    pass

@sio.event
def connect(sid, environ):
    print('Connected', sid)

@sio.event
def disconnect(sid):
    print('Disconnected', sid)

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
            return make_response(jsonify(session=room), 200)
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
        room = Session(hostId, title, location, duration, starttime, endtime, votingtime, weekends)
        update(room.__dict__, 'session')
        return make_response(jsonify(message='Session created successfully'), 200)
    else:
        return make_response(jsonify(errors=errors), 400)
