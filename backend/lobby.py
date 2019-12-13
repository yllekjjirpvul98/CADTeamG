# lobby api - socket
from flask_socketio import SocketIO
from flask import Flask, Blueprint
from flask_socketio import join_room, send, leave_room
import uuid

app = Flask(__name__)
lobby = SocketIO(app)

@lobby.on('connect')
def on_connect():
    print("connection established")

@lobby.on('createRoom')
def on_create(data):
    # authentication token 
    eventid = str(uuid.uuid4())[:8]
    join_room(eventid)
    lobby.emit('created', {"eventid" : eventid}, room=eventid)

@lobby.on('joinRoom')
def on_join(data):
    userid = data['userid']
    room = data['eventid']
    join_room(room)
    lobby.emit("joined", {"userid" :userid}, room=room)

@lobby.on('leave')
def on_leave(data):
    userid = data['userid']
    room = data['eventid']
    leave_room(room)
    lobby.emit("left", {"userid" : userid}, room=room)




