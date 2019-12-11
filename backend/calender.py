from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventByUserId
from JSONObject.event import Event
import json

calendar = Blueprint('calendar', __name__)

@calendar.route('/createEvent', methods=['POST'])
def createEvent():
    data = request.get_json()
    userid = data.get('userid')
    starttime = data.get('starttime')
    endtime = data.get('endtime')
    repeatable = data.get('repeatable')
    hostFlag = data.get('hostFalg')

    errors = {}
    if(userid is None): errors['userid'] = 'User id is empty'
    if(starttime is None): errors['starttime'] = 'Start time is empty'
    if(endtime is None): errors['endtime'] = 'End time is empty'
    if(repeatable is None): errors['repeatable'] = 'Repeatable is empty'
    if(hostFlag is None): errors['hostFlag'] = 'Host flag is empty'

    if len(errors.keys()) == 0:
        event = Event(userid, starttime, endtime, repeatable, hostFlag)
        update(event.__dict__, 'event')
        return make_response(jsonify(userid=userid, starttime=starttime, endtime=endtime, repeatable=repeatable))
    else:
        return make_response(jsonify(errors), 400)

@calendar.route('/deleteEvent', methods=['DELETE'])
def deleteEvent():
    data = request.get_json()
    eventid = data.get("eventid")
    if(eventid is None): return make_response(jsonify(eventid='Event id is empty'), 400)
    delete("event", eventid)
    
@calendar.route('/getEvents', methods= ['GET'])
def getEvents():
    data = request.get_json()
    userid = data.get('userid')

    if(userid is None): return make_response(jsonify(userid='User id is empty'), 400)

    event = getEventByUserId('event', userid)
    if len(event) == 0:
        return make_response('Event does not exist', 404)
    else:
        result = list(map(lambda x : from_datastore(x), event))
        return json.dumps(resultnput, 400)   
