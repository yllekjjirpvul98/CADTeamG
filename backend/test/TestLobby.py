import unittest
import socketio

client = socketio.Client()
client.connect("http://localhost:8080", namespaces='/connect')

@client.on('connect')
def onConnect(userid):
    client.emit('createRoom', {"userid" : userid})

@client.on('created')
def test_recieved_message(data):
    print (data['eventid'])