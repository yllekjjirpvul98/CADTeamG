from flask import Flask, Blueprint, request, make_response
from google.cloud import datastore
from db import get, update, delete, from_datastore, getEventByUserId
from JSONObject.event import Event
import json

calender = Blueprint('calender', __name__)

@calender.route('/createEvent', methods=['POST'])
def createEvent():
     data = request.get_json(force = True)
     if data is not None:
        userid = data['userid']
        starttime = data['starttime']
        endtime = data['endtime']
        repeatable = data['repeatable']
        hostFlag = data['hostFlag']
            
        event = Event(userid, starttime, endtime, repeatable, hostFlag)
        update(event.__dict__, "event")
        return make_response("event created")
     else:
        return make_response("empty data", 400)

@calender.route('/deleteEvent')
def deleteEvent():
    data = request.get_json(force = True)
    eventid = data["eventid"]
    delete("event", eventid)
    
@calender.route('/getEvents', methods= ['GET'])
def getEvents():
    data = request.get_json(force = True)
    if data is not None:
        userid = data['userid']
        event = getEventByUserId("event", userid)
        if len(event) == 0:
            return make_response("empty event for the user", 400)
        else:
            return from_datastore(event)
    else:
         return make_response("empty input", 400)   
