/* eslint-disable indent */
import axios from '../utils/axios';
import {
 SIGN_IN, SIGN_UP, AUTH, GET_ERRORS, CLEAR_ERRORS, SET_LOADER, CLEAR_LOADER,
} from './types';
import { validateSignIn, validateSignUp } from './validation/user';

const signIn = (data) => (dispatch) => {
  const errors = validateSignIn(data);

  if (Object.values(errors).length > 0) return dispatch({ type: GET_ERRORS, payload: errors });

  dispatch({ type: SET_LOADER, payload: SIGN_IN });
  return axios.post('/auth/login', data)
              .then((res) => dispatch({ type: SIGN_IN, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: SIGN_IN }));
};

const signUp = (data) => (dispatch) => {
  const errors = validateSignUp(data);

  if (Object.values(errors).length > 0) return dispatch({ type: GET_ERRORS, payload: errors });

  dispatch({ type: SET_LOADER, payload: SIGN_UP });

  return axios.post('/auth/register', data)
              .then((res) => dispatch({ type: SIGN_UP, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: SIGN_UP }));
};

const authenticate = () => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('jwt');

  dispatch({ type: SET_LOADER, payload: AUTH });

  return axios.get('/auth/authenticate')
              .then((res) => dispatch({ type: AUTH, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: AUTH }));
};

const clearErrors = () => (dispatch) => dispatch({ type: CLEAR_ERRORS });

export {
 signIn, signUp, authenticate, clearErrors,
};
