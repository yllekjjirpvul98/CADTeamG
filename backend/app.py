from flask import Flask
from google.cloud import datastore
from auth import auth
from calender import calendar
from flask_cors import CORS
from lobby import lobby
from flask_socketio import SocketIO

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(calendar, url_prefix='/calendar')
app.register_blueprint(lobby, url_prefix='/lobby')
CORS(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

