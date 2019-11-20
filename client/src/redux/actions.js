/* eslint-disable indent */
import axios from 'axios';
import { SIGN_IN, SIGN_UP, GET_ERRORS } from './types';

const signIn = (data) => (dispatch) => {
  axios.post('https://my-json-server.typicode.com/yllekjjirpvul98/CADTeamG/users', { id: 1, ...data })
       .then((res) => dispatch({ type: SIGN_IN, payload: res.data }))
       .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

const signUp = (data) => (dispatch) => {
  axios.post('https://my-json-server.typicode.com/yllekjjirpvul98/CADTeamG/users', { id: 1, ...data })
       .then((res) => dispatch({ type: SIGN_UP, payload: res.data }))
       .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export { signIn, signUp };
