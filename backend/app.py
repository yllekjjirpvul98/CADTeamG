from flask import Flask
from flask_session import Session
from google.cloud import datastore
from auth import auth
from event import event
from lobby import lobby
from flask_cors import CORS
import socketio
from gevent import pywsgi
from lobby import sio
import redis
import os

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(event, url_prefix='/events')
app.register_blueprint(lobby, url_prefix='/session')
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)
app.config['SESSION_TYPE'] = 'redis'
# Redis configuration
host = 'redis-15168.c55.eu-central-1-1.ec2.cloud.redislabs.com'
port = 15168
# keep this safe somewhere
password = 'XJWNtWEBxXphdszQEkScY3B5LryyPLSX'
app.config['SESSION_REDIS'] = redis.StrictRedis(host=host, port=port, password=password)
Session(app)
CORS(app)

if __name__ == '__main__':
    app.run(threaded=True, port=8080)