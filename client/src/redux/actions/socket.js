/* eslint-disable indent */
import { toast } from 'react-toastify';
import { ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, START_SESSION, SET_WINNER, ENTER_ROOM, CLEAR_WEBSOCKET,
  CLEAR_LOADER, SET_LOADER, SET_TIMESLOTS, GET_ERRORS, ADD_VOTE, CLEAR_SESSION, LEAVE_ROOM } from '../types';

// Message
const ioMsg = (socket, message) => (dispatch) => {

  if (!message) return

  socket.emit('message', message);
  dispatch({ type: SET_LOADER, payload: ADD_MESSAGE })
};

const ioOnMsg = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, payload: JSON.parse(message) });
  dispatch({ type: CLEAR_LOADER, payload: ADD_MESSAGE })
};

// Start
const ioStart = (socket, id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: START_SESSION })
  socket.emit('start', id);
};

const ioOnStart = (data) => (dispatch) => {
  let { votingend, timeslots } = data;

  if (!votingend) {
    data = JSON.parse(data);
    votingend = new Date(data.votingend);
    timeslots = data.timeslots;
  } else {
    votingend = new Date(votingend);
    votingend.setHours(votingend.getHours());
  }

  const now = new Date();

  if (votingend < now) return;

  dispatch({ type: SET_TIMESLOTS, payload: timeslots });
  dispatch({ type: CLEAR_LOADER })

  const seconds = Math.ceil(Math.abs((now.getTime() - votingend.getTime()) / 1000));
  
  toast(`Voting has started, you have ${seconds} seconds to vote`)

  dispatch({ type: SET_TIMER, payload: seconds });

  const timer = setInterval(() => dispatch({ type: DECREMENT_TIMER, payload: timer }), 1000);
};

// Vote
const ioVote = (socket, timeslot) => (dispatch) => {
  socket.emit('vote', timeslot);
}

// Join
const ioOnJoin = (data, props) => (dispatch) => {
  const { id, username } = JSON.parse(data);

  dispatch({ type: ENTER_ROOM, payload: { id, username, props }});

  props.getSession(props.match.params.id);
};

const ioOnLeave = (props) => (dispatch) => {
  props.getSession(props.match.params.id);
};

const ioOnDisconnect = (data) => (dispatch) => {
  const { id, username } = JSON.parse(data);

  if (!id) return;

  dispatch({ type: LEAVE_ROOM, payload: { id, username }});
};

// Close
const ioClose = (socket, id) => (dispatch) => {
  socket.emit('close', id);

  dispatch({ type: CLEAR_SESSION });
};

const ioOnClose = (props) => (dispatch) => {
  toast.error(`Room was closed by the host`, { className: 'ui error message'});

  props.history.push('/home');
  dispatch({ type: CLEAR_SESSION });
};

const ioOnVote = (data) => (dispatch) => {

  const { timeslot, username } = JSON.parse(data)
  
  dispatch({ type: ADD_VOTE, payload: { timeslot, username }});
  toast(`${username} has just voted ${new Date(timeslot).toLocaleString("en-GB")}`)
}

const ioOnError = (data) => (dispatch) => {
  toast.error(data, { className: 'ui error message' })
  dispatch({ type: GET_ERRORS, payload: { data: { socket: data } } });
  dispatch({ type: CLEAR_LOADER, payload: START_SESSION });
}

const ioOnResult = (winner) => (dispatch) => {
  toast.success(`${winner} has won`, { className: 'ui success message' })
  dispatch({ type: SET_WINNER, payload: { winner }})
}

const clearWebsocket = () => (dispatch) => {

  dispatch({ type: CLEAR_WEBSOCKET });

}

export { ioMsg, ioOnMsg, ioStart, ioOnStart, ioVote, ioOnJoin, ioOnResult, ioOnDisconnect,
  ioOnLeave, ioClose, ioOnClose, ioOnVote, ioOnError, clearWebsocket };
