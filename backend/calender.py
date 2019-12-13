from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventByUserId,getEventByEventId
from JSONObject.event import Event
import json
import uuid
from auth import getUser, auth_required

calendar = Blueprint('calendar', __name__)

@calendar.route('/createEvent', methods=['POST'])
@auth_required
def createEvent():
    data = request.get_json()
    userid = getUser().json['id']
    starttime = data.get('starttime')
    endtime = data.get('endtime')
    repeatable = data.get('repeatable')
    hostFlag = data.get('hostFlag')
    title = data.get('title')
    location = data.get('location')
    eventid = str(uuid.uuid4())[:8]

    errors = {}
    if(userid is None): errors['userid'] = 'User id is empty'
    if(starttime is None): errors['starttime'] = 'Start time is empty'
    if(endtime is None): errors['endtime'] = 'End time is empty'
    if(repeatable is None): errors['repeatable'] = 'Repeatable is empty'
    if(hostFlag is None): errors['hostFlag'] = 'Host flag is empty'
    if(title is None): errors['title'] = 'Title is empty'
    if(location is None): errors['location'] = 'Location is empty'


    if len(errors.keys()) == 0:
        event = Event(eventid, starttime, endtime, repeatable, location, title, hostFlag)
        update(event.__dict__, 'event')
        return make_response(jsonify(eventid=eventid, userid=userid, starttime=starttime, endtime=endtime, repeatable=repeatable))
    else:
        return make_response(jsonify(errors), 400)

@calendar.route('/deleteEvent', methods=['POST'])
@auth_required
def deleteEvent():
    data = request.get_json(force = True)
    eventid = data["eventid"]
    userid = getUser().json['id']
    events = getEventByEventId("event", eventid)
    if len(events) != 0:
        if from_datastore(events[0])['hostId']== userid:
            for event in events:
                delete("event", event.key.id_or_name)
            return make_response("Event deleted")
        else:
            return make_response("Unauthorized", 401)
    else:
        return make_response("No matching event", 400)
    
@calendar.route('/getEvents', methods=['POST'])
@auth_required
def getEvents():
    data = request.get_json(force = True)
    userid = getUser().json['id']
    if data is not None:
        event = getEventByUserId("event", userid)
        if len(event) == 0:
            return make_response("empty event for the user", 400)
        else:
            result = list(map(lambda x : from_datastore(x), event))
            return jsonify(result)
    else:
         return make_response("empty input", 400) 
