# register & login
from flask import Flask, Blueprint, request, make_response, jsonify
from google.cloud import datastore
from db import get, update, delete, getbyname, from_datastore, secret
from JSONObject.user import User
from jose import jwt
from functools import wraps
import json
import bcrypt

auth = Blueprint('auth', __name__)

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        try:
            if token is not None:
                decoded = jwt.decode(token, secret, algorithms=['HS256'])
                request.id = decoded.get('id')
                request.username = decoded.get('username')
                return f(*args, **kwargs)
            return make_response(jsonify(authentication='Authentication failed'), 400)
        except:
            return make_response(jsonify(authentication='Signature verification failed'), 400)
    return decorated

@auth.route('/authenticate')
@auth_required
def getUser():
    user = get(request.id, 'user')
    return jsonify(id=user.get('id'), username=user.get('username'))

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
 
    username = data.get('username')
    password = data.get('password')
    
    errors = {}
    if(username is None): errors['username'] = 'Username is empty'
    if(password is None): errors['password'] = 'Password is empty'

    if len(errors.keys()) == 0:
        user = getbyname('user', username)
        if len(user) == 0:
            return make_response(jsonify(username='User does not exist'), 400)
        else:
            user = from_datastore(user[0])
            if bcrypt.checkpw(password.encode('UTF-8'), user['password']):
                token = jwt.encode({'id': user.get('id'), 'username': user.get('username')}, secret, algorithm='HS256')
                return make_response(jsonify(token=token), 200)
            else:
                return make_response(jsonify(password='Wrong password'), 400)
        return make_response(jsonify(errors=errors), 400)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password').encode('UTF-8')

    errors = {}
    if(username is None): errors['username'] = 'Username is empty'
    if(password is None): errors['password'] = 'Password is empty'

    hashed = bcrypt.hashpw(password, bcrypt.gensalt())

    if len(errors.keys()) == 0:
        if len(getbyname('user', username)) != 0:
            return make_response(jsonify(username='User already exists'), 400)
        else:
            user = User(username, hashed)
            update(user.__dict__, 'user')
            return make_response(jsonify(message='Registration successful'))
    else:
        return make_response(jsonify(errors=errors), 400)
