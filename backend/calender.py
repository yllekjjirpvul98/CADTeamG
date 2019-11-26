from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventByUserId, getEventByEventId
from JSONObject.event import Event
import json

# TODO: Fix typo : calender -> calendar
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
    data = request.get_json(force = True)
    eventid = data["eventid"]
    # TODO: change when jwt is done
    userid = data["userid"]
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
