/* eslint-disable indent */
import axios from '../../utils/axios';
import { GET_EVENTS, POST_EVENT, PUT_EVENT, DELETE_EVENT, GET_ERRORS, SET_LOADER, CLEAR_LOADER } from '../types';
import { validateEvent } from '../validation/event';

const getEvents = () => (dispatch) => {

    dispatch({ type: SET_LOADER, payload: GET_EVENTS });
    return axios.get('/events/')
                .then((res) => dispatch({ type: GET_EVENTS, payload: res.data }))
                .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
                .finally(() => dispatch({ type: CLEAR_LOADER, payload: GET_EVENTS }));
};

const postEvent = (event) => (dispatch) => {
  const errors = validateEvent(event);
    
  if (Object.values(errors).length > 0) return dispatch({ type: GET_ERRORS, payload: { data: errors } });

  dispatch({ type: SET_LOADER, payload: POST_EVENT });
  return axios.post('/events/', event)
              .then((res) => dispatch({ type: POST_EVENT, payload: res.data }))
              .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
              .finally(() => dispatch({ type: CLEAR_LOADER, payload: POST_EVENT }));
};

const updateEvent = (event, id) => (dispatch) => {      

    dispatch({ type: SET_LOADER, payload: PUT_EVENT });
    return axios.put(`/events/${id}`, event)
                .then((res) => dispatch({ type: PUT_EVENT, payload: res.data }))
                .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
                .finally(() => dispatch({ type: CLEAR_LOADER, payload: PUT_EVENT }));
};

const deleteEvent = (id) => (dispatch) => {
  
    dispatch({ type: SET_LOADER, payload: DELETE_EVENT });
    return axios.delete(`/events/${id}`)
                .then((res) => dispatch({ type: DELETE_EVENT, payload: res.data }))
                .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response }))
                .finally(() => dispatch({ type: CLEAR_LOADER, payload: DELETE_EVENT }));
};

export { getEvents, postEvent, updateEvent, deleteEvent };
