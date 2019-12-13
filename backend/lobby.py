# lobby api - socket
from flask_socketio import SocketIO
from flask import Flask, Blueprint

lobby = Blueprint('lobby', __name__)
lobby = SocketIO(lobby)

@lobby.on('create')
def on_join(data):
    userid = data['userid']
    room = data['eventid']
    join_room(room)
    send(, room=room)

@lobby.on('leave')
def on_leave(data):
    userid = data['userid']
    room = data['eventid']
    leave_room(room)
    send(, room=room)




