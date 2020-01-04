from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventsByUserId,getEventByEventId
from JSONObject.event import Event
import json
import uuid
from auth import getUser, auth_required
from validation.event import validate_post_event, validate_put_event

event = Blueprint('event', __name__)

@event.route('/', methods=['GET'])
@auth_required
def getEvents():
    events = getEventsByUserId(request.id)
    for event in events:
        event['id'] = event.id # THIS ACTUALLY WORKS LOL
    if len(events) != 0:
        return make_response(jsonify(events=events), 200)
    else:
        return make_response(jsonify(events=[]), 200)


@event.route('/', methods=['POST'])
@auth_required
def postEvent():
    data = request.get_json()

    username = request.username
    userid = request.id
    title = data.get('title')
    location = data.get('location')
    starttime = data.get('starttime') 
    endtime = data.get('endtime')   # TODO END CANNOT OCCUR BEFORE START

    errors = validate_post_event(title, location, starttime, endtime)

    if len(errors.keys()) == 0:
        event = Event(userid, username, title, location, starttime, endtime)
        event = update(event.__dict__, 'event')
        return make_response(jsonify(id=event.get('id'), userid=userid, username=username, title=title, 
                                location=location, starttime=starttime, endtime=endtime), 200)
    else:
        return make_response(jsonify(errors), 400)

@event.route('/<id>', methods=['GET'])
@auth_required
def getEvent(id):
    event = get(id, 'event')
    if event is not None:
        return make_response(jsonify(event=event), 200)
    else:
        return make_response(jsonify(event='Event does not exist'), 400)

@event.route('/<id>', methods=['PUT'])
@auth_required
def putEvent(id):
    data = request.get_json()
    
    title = data.get('title')
    location = data.get('location')
    starttime = data.get('starttime')
    endtime = data.get('endtime')

    if(id is None): 
        return make_response(jsonify(id='Event id is empty'), 400)

    errors = validate_put_event(title, location, starttime, endtime)

    if len(errors.keys()) < 4: # User has to update minimum one property TODO find a better way to do this  
        event = get(id, 'event')
        if event is not None:
            event['title'] = title or event.get('title')
            event['location'] = location or event.get('location')
            event['starttime'] = starttime or event.get('starttime')
            event['endtime'] = endtime or event.get('endtime')
            updated = update(event, 'event', id)
            return make_response(updated, 200)
        else:
            return make_response(json.dumps({'id': 'Event does not exist'}), 400)
    else:
         return make_response(jsonify(errors=errors), 400) 

@event.route('/<id>', methods=['DELETE'])
@auth_required
def deleteEvent(id):
    event = get(id, 'event')
   
    if event is not None:
        if event.get('userid') == request.id:
            delete('event', id)
            return make_response(jsonify(id=id), 200)
        else:
            return make_response('Thats not your event', 401)
    else:
        return make_response('No matching event', 400)
