from flask import Flask
from google.cloud import datastore
from auth import auth
from calender import calender

app = Flask(__name__)
app.register_blueprint(auth)
app.register_blueprint(calender)

if __name__ == '__main__':
    app.run(
        port=1200,
        threaded=True
    )