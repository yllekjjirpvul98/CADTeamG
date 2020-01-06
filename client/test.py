import asyncio
from aiohttp import web
import socketio
import socketio
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore, secret, getSessionByCode, getEventsByUserId
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

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ):
    print(sid + ' connects')

@sio.event
async def disconnect(sid):
    try:
        user = await sio.get_session(sid)
        await sio.emit('leave', sio.get_session(sid).get('username'), room=user.get('room'), skip_sid=sid)
    except TypeError:
        pass
    except KeyError:
        pass
    await sio.save_session(sid, None)

@sio.on('join')
async def join(sid, room, username, userid):
    sio.enter_room(sid, room)
    await sio.save_session(sid, {'username': username, 'room': room, 'id': userid })
    await sio.emit('join', username, room=room, skip_sid=sid)

@sio.on('message')
async def message(sid, msg):
    user = await sio.get_session(sid)
    timestamp = strftime("%H:%M", gmtime())
    await sio.emit('message', json.dumps({'message': msg, 'username': user.get('username'), 'time': timestamp }), room=user.get('room'))

@sio.on('start')
async def start(sid, roomid):    
    time = datetime.datetime.now()
    user = await sio.get_session(sid)
    room = await get(roomid, 'session')
    
    if room is None:
        await sio.emit('error', 'Room does not exist', room=sid)
        return

    if room.get('votingend') is not None:
        await sio.emit('error', 'Voting has been already started', room=sid)
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

if __name__ == '__main__':
    web.run_app(app)