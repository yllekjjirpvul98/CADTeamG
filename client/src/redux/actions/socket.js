/* eslint-disable indent */
import { toast } from 'react-toastify';
import { ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, JOIN_ROOM, LEAVE_ROOM, START_SESSION, CLEAR_LOADER, SET_LOADER } from '../types';

const ioMsg = (socket, message) => (dispatch) => {
  socket.emit('message', message);
};

const ioOnMsg = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, payload: JSON.parse(message) });
};

const ioOnJoin = (username) => (dispatch) => {
  toast(`${username} has joined the room`)
  dispatch({ type: JOIN_ROOM, payload: username });
};

const ioOnStart = (endtime) => (dispatch) => {

  dispatch({ type: CLEAR_LOADER })

  if (typeof endtime === 'object') endtime.setHours(endtime.getHours() - 1);
  else endtime = new Date(endtime);

  const now = new Date();

  if (endtime < now) return;

  const seconds = Math.ceil(Math.abs((now.getTime() - endtime.getTime()) / 1000));

  toast(`Voting has started, you have ${seconds} seconds to vote`)

  dispatch({ type: SET_TIMER, payload: seconds });

  const timer = setInterval(() => dispatch({ type: DECREMENT_TIMER, payload: timer }), 1000);
};

const ioStart = (socket) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: START_SESSION })
  socket.emit('start');
};

const ioOnLeave = (username) => (dispatch) => {
  toast(`${username} has left the room`)
  dispatch({ type: LEAVE_ROOM, payload: username });
};

const ioClose = (socket, id) => (dispatch) => {
  socket.emit('close', id)
};

const ioOnClose = (data) => (dispatch) => {
  toast(`Room was closed by the host`)
};


export { ioMsg, ioOnMsg, ioOnJoin, ioStart, ioOnLeave, ioClose, ioOnStart, ioOnClose };
