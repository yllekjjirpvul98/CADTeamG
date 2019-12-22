/* eslint-disable indent */
import { ADD_MESSAGE } from '../types';

const ioMsg = (socket, msg) => (dispatch) => {
  socket.emit('message', msg);
};

const ioOnMsg = (msg) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, payload: msg });
};

const ioOnJoin = (socket, msg) => (dispatch) => {

};

const ioLeave = (socket, msg) => (dispatch) => {

};

const ioClose = (data) => (dispatch) => {
  console.log(data)
};

export { ioMsg, ioOnMsg, ioOnJoin, ioLeave, ioClose };
