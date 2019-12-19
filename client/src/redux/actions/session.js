/* eslint-disable indent */
import axios from '../../utils/axios';
import { JOIN_SESSION, HOST_SESSION, GET_ERRORS, SET_LOADER, CLEAR_LOADER,
  GET_SESSION, CLEAR_ERRORS, CLOSE_SESSION, START_SESSION, GET_SESSION_EVENTS } from '../types';
import { validateJoinSession, validateHostSession } from '../validation/session';

const joinSession = (data) => (dispatch) => {
  const { validated, errors } = validateJoinSession(data);

  if (!validated) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

  dispatch({ type: SET_LOADER, payload: JOIN_SESSION });
  return axios.post('/session/join', data)
              .then((res) => dispatch({ type: JOIN_SESSION, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: JOIN_SESSION }));
};

const hostSession = (data) => (dispatch) => {
    data.starttime = new Date(`${data.date} ${data.starttime}`);
    data.endtime = new Date(`${data.date} ${data.endtime}`);

    const { validated, errors } = validateHostSession(data);

    if (!validated) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

    dispatch({ type: SET_LOADER, payload: HOST_SESSION });
    return axios.post('/session/host', data)
                .then((res) => dispatch({ type: HOST_SESSION, payload: res.data }))
                .then(dispatch({ type: CLEAR_ERRORS }))
                .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
                .finally(() => dispatch({ type: CLEAR_LOADER, payload: HOST_SESSION }));
};

const getSession = (id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: GET_SESSION });
  return axios.get(`/session/${id}`)
              .then((res) => dispatch({ type: GET_SESSION, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: GET_SESSION }));
};


const getSessionEvents = (id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: GET_SESSION_EVENTS });
  return axios.get(`/session/${id}/events`)
              .then((res) => dispatch({ type: GET_SESSION_EVENTS, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: GET_SESSION_EVENTS }));
};

const startSession = (id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: START_SESSION });
  return axios.get(`/session/${id}`)
              .then((res) => dispatch({ type: START_SESSION, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: START_SESSION }));
};

const closeSession = (id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: CLOSE_SESSION });
  return axios.delete(`/session/${id}`)
              .then((res) => dispatch({ type: CLOSE_SESSION, payload: res.data }))
              .then(dispatch({ type: CLEAR_ERRORS }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: CLOSE_SESSION }));
};

export { joinSession, hostSession, getSession, getSessionEvents, startSession, closeSession };
