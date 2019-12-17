/* eslint-disable indent */
import axios from '../../utils/axios';
import {
 JOIN_SESSION, HOST_SESSION, GET_ERRORS, SET_LOADER, CLEAR_LOADER, GET_SESSION
} from '../types';
import { validateJoinSession, validateHostSession } from '../validation/session';

const joinSession = (data) => (dispatch) => {
  const errors = validateJoinSession(data);

  if (Object.values(errors).length > 0) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

  dispatch({ type: SET_LOADER, payload: JOIN_SESSION });
  return axios.post('/session/join', data)
              .then((res) => dispatch({ type: JOIN_SESSION, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: JOIN_SESSION }));
};

const hostSession = (data) => (dispatch) => {
    const errors = validateHostSession(data);
  
    if (Object.values(errors).length > 0) return dispatch({ type: GET_ERRORS, payload: { data: errors } });
  
    dispatch({ type: SET_LOADER, payload: HOST_SESSION });
    return axios.post('/session/host', data)
                .then((res) => dispatch({ type: HOST_SESSION, payload: res.data }))
                .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
                .finally(() => dispatch({ type: CLEAR_LOADER, payload: HOST_SESSION }));
};
  
const getSession = (id) => (dispatch) => {

  dispatch({ type: SET_LOADER, payload: GET_SESSION });
  return axios.get(`/session/${id}`)
              .then((res) => dispatch({ type: GET_SESSION, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: GET_SESSION }));
};

export { joinSession, hostSession, getSession };
