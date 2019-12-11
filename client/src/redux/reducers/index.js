import { combineReducers } from 'redux';
import user from './user';
import errors from './errors';
import loader from './loader';

export default combineReducers({ user, loader, errors });
