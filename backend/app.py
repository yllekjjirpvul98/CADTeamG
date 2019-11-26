from flask import Flask
from google.cloud import datastore
from auth import auth
from calender import calender

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(calender, url_prefix='/calendar')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)