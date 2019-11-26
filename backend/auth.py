# register & login
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore
from JSONObject.user import User
import json

auth = Blueprint('auth', __name__)

# TODO: Use JWT Web Token
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json(force = True)
    if data is not None:
        username = data['username']
        password = data['password']
        user = getbyname("user", username)
        if len(user) == 0:
            return make_response("user not registered", 400)
        else:
            user = from_datastore(user[0])
            if user['password'] != password:
                return make_response("wrong password", 400)
            else:
                # return user
                return jsonify(user)
    else:
        return make_response("empty input", 400)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json(force = True)
    if data is not None:
        username = data['username']
        password = data['password']
        if len(getbyname("user", username)) != 0:
            return make_response("user already exist", 400)
        else:
            user = User(username, password)
            update(user.__dict__, "user")
            return make_response("user registered")
    else:
        return make_response("empty data", 400)
