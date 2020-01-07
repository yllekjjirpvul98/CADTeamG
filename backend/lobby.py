import socketio
import json
import threading
import datetime
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore, secret, getSessionByCode, getEventsByUserId
from JSONObject.user import User
from JSONObject.event import Event
from jose import jwt
from functools import wraps
from auth import auth_required
from JSONObject.session import Session
from time import gmtime, strftime, sleep
from utils import generateTimeslots
from validation.lobby import validate_join_session, validate_host_session

lobby = Blueprint('session', __name__)

@lobby.route('/<int:id>')
@auth_required
def getSession(id):
    room = get(id, 'session')
    hostId = room.get('hostId')
    host = get(hostId, 'user')

    if host is None:
        return make_response(jsonify(id='Room does not exist'), 400) 

    if request.id not in room.get('participants'):
        return make_response(jsonify(code='You need to enter the code to access this room'), 400)

    return make_response(jsonify(id=id, code=room.get('code'), hostId=room.get('hostId'), title=room.get('title'), 
                                 location=room.get('location'), duration=room.get('duration'), starttime=room.get('starttime'), 
                                 endtime=room.get('endtime'), votingtime=room.get('votingtime'), weekends=room.get('weekends'), 
                                 timeslots=room.get('timeslots'), winner=room.get('winner') or None, hostUsername=host.get('username'),
                                 votingend=room.get('votingend') or None, participants=room.get('participants')), 200)

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
        roomid = room.get('id')
        hostId = room.get('hostId')
        host = get(hostId, 'user')
        updated = update(room, 'session', roomid)

        return make_response(jsonify(id=roomid, hostId=updated.get('hostId'), title=updated.get('title'), code=updated.get('code'),
                                     location=updated.get('location'), duration=updated.get('duration'), starttime=updated.get('starttime'), 
                                     endtime=updated.get('endtime'), votingtime=updated.get('votingtime'), weekends=updated.get('weekends'), 
                                     hostUsername=host.get('username'),  participants=updated.get('participants')), 200)
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
        room = Session(hostId, title, location, starttime, endtime, duration, votingtime, weekends)

        update(room.__dict__, 'session')
        room = getSessionByCode(room.code)
        room = from_datastore(room[0])
        hostId = room.get('hostId')
        host = get(hostId, 'user')

        return make_response(jsonify(id=room.get('id'), code=room.get('code'), hostId=hostId, title=title, location=location, 
                                     starttime=starttime, endtime=endtime, hostUsername=host.get('username'), duration=duration, 
                                     votingtime=votingtime, weekends=weekends, participants=room.get('participants')), 200)
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

    if room is None:
        make_response(jsonify(id='Room does not exist'), 400)

    if request.id == room.get('hostId'):
        delete('session', id)
        return make_response(jsonify(id=str(id)), 200)   

    return make_response(jsonify(id='You need host permission to delete this room'), 400)

@lobby.route('/<int:id>', methods=['PUT'])
@auth_required
def leaveSession(id):

    room = get(id, 'session')
    user = get(request.id, 'user')

    if room is None or user is None:
       return make_response(jsonify(id='Room does not exist'), 400)

    if request.id not in room['participants']:
        return make_response(jsonify(id='You must be in the room before you leave it'), 400)

    room['participants'].remove(request.id)
    updated = update(room, 'session', id)

    return make_response(updated, 200)