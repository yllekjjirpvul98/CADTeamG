/* eslint-disable indent */
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { SIGN_IN, SIGN_UP, AUTH, GET_ERRORS, SET_LOADER, CLEAR_USER, CLEAR_SESSION, CLEAR_EVENTS, CLEAR_LOADER, CLEAR_ERRORS } from '../types';
import { validateSignIn, validateSignUp } from '../validation/user';

const signIn = (data) => (dispatch) => {
  const { validated, errors } = validateSignIn(data);

  if (!validated) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

  dispatch({ type: SET_LOADER, payload: SIGN_IN });
  return axios.post('/auth/login', data)
              .then((res) => dispatch({ type: SIGN_IN, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: SIGN_IN }));
};

const signUp = (data) => (dispatch) => {
  const { validated, errors } = validateSignUp(data);

  if (!validated) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

  dispatch({ type: SET_LOADER, payload: SIGN_UP });

  return axios.post('/auth/register', data)
              .then((res) => dispatch({ type: SIGN_UP, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: SIGN_UP }));
};

const authenticate = () => (dispatch) => { 
  axios.defaults.headers.common.authorization = localStorage.getItem('jwt');

  dispatch({ type: SET_LOADER, payload: AUTH });

  return axios.get('/auth/authenticate')
              .then((res) => dispatch({ type: AUTH, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: AUTH }));
};

const signOut = () => (dispatch) => {
  localStorage.removeItem('jwt');

  toast.success('Signed out successfully', { className: "ui success message"});

  dispatch({ type: CLEAR_USER })
  dispatch({ type: CLEAR_SESSION });
  dispatch({ type: CLEAR_EVENTS });
  dispatch({ type: CLEAR_LOADER });
  dispatch({ type: CLEAR_ERRORS });
  
}

export { signIn, signUp, signOut, authenticate };
