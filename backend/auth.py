# register & login
from flask import Flask, Blueprint, request, make_response
from google.cloud import datastore
from db import get, update, delete, getbyname
from JSONObject.user import User
import json

auth = Blueprint('auth', __name__)

@auth.route('/')
def hello():
    return "Hello World"

@auth.route('/login')
def login(username, password):
    user = get(username, "user")
    if user is None:
        return make_response("user not registered", 400)
    elif user.password != password:
        return make_response("wrong password", 400)
    else:
        return make_response("successfully logged in")


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json(force = True)
    if data is not None:
        username = data['username']
        password = data['password']
        print(getbyname("user", username))
        if len(getbyname("user", username)) != 0:
            return make_response("user already exist", 400)
        else:
            user = User(username, password)
            update(user.__dict__, "user")
            return make_response("user registered")
    else:
        return make_response("empty data", 400)
