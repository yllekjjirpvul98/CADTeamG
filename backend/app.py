from flask import Flask
from google.cloud import datastore
from auth import auth
from event import event
from lobby import session
from flask_cors import CORS
import socketio
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from lobby import sio

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(event, url_prefix='/events')
app.register_blueprint(session, url_prefix='/session')
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)
CORS(app)

if __name__ == '__main__':
    app.run(threaded=True, port=8080)