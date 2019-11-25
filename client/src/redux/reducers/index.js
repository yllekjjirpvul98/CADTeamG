import { combineReducers } from 'redux';
import user from './user';
import errors from './errors';
import loaders from './loaders';

export default combineReducers({ user, loaders, errors });
