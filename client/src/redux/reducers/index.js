import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import events from './events';
import loader from './loader';
import errors from './errors';

export default combineReducers({ user, session, events, loader, errors });
