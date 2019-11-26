from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventByUserId
from JSONObject.event import Event
import json

calender = Blueprint('calender', __name__)

@calender.route('/createEvent', methods=['POST'])
def createEvent():
     data = request.get_json(force = True)
     if data is not None:
        eventid = data['eventid']
        userid = data['userid']
        starttime = data['starttime']
        endtime = data['endtime']
        repeatable = data['repeatable']
        hostId = data['hostId']
        location = data['location']
        title = data['title']
            
        event = Event(eventid, userid, starttime, endtime, repeatable, hostId, location, title)
        update(event.__dict__, "event", eventid+":"+userid)
        return make_response("event created")
     else:
        return make_response("empty data", 400)

@calender.route('/deleteEvent', methods=['POST'])
def deleteEvent():
    # TODO: This method needs to be refined as multiple rows have same eventid
    data = request.get_json(force = True)
    eventid = data["eventid"]
    delete("event", eventid)
    return make_response("Event deleted")
    
@calender.route('/getEvents', methods=['POST'])
def getEvents():
    data = request.get_json(force = True)
    userid = data['userid']
    if data is not None:
        event = getEventByUserId("event", userid)
        if len(event) == 0:
            return make_response("empty event for the user", 400)
        else:
            result = list(map(lambda x : from_datastore(x), event))
            return jsonify(result)
    else:
         return make_response("empty input", 400)   
