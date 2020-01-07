import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import websocket from './websocket';
import events from './events';
import loader from './loader';
import errors from './errors';

export default combineReducers({ user, session, websocket, events, loader, errors });
