import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import loader from './loader';
import errors from './errors';

export default combineReducers({ user, events, loader, errors });
