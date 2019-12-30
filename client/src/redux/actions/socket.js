/* eslint-disable indent */
import { toast } from 'react-toastify';
import { ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, START_SESSION, CLEAR_LOADER, SET_LOADER, SET_TIMESLOTS, SET_VOTES } from '../types';

// Message
const ioMsg = (socket, message) => (dispatch) => {
  socket.emit('message', message);
};

const ioOnMsg = (message) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, payload: JSON.parse(message) });
};

// Start
const ioStart = (socket, id) => (dispatch) => {
  dispatch({ type: SET_LOADER, payload: START_SESSION })
  socket.emit('start', id);
};

const ioOnStart = (data) => (dispatch) => {
  
  let { votingend, timeslots, votes } = data;
  
  if (!votingend) {
    data = JSON.parse(data);
    votingend = new Date(data.votingend);
    timeslots = data.timeslots;
    votes = data.votes;
  } else {
    votingend = new Date(votingend);
    votingend.setHours(votingend.getHours() - 1);
  }
  
  dispatch({ type: SET_TIMESLOTS, payload: timeslots });
  dispatch({ type: SET_VOTES, payload: votes })
  dispatch({ type: CLEAR_LOADER })

  const now = new Date();

  if (votingend < now) return;

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
const ioOnJoin = (username) => (dispatch) => {
  toast(`${username} has joined the room`)
};

const ioOnLeave = (username) => (dispatch) => {

  if (!username) return;

  toast(`${username} has left the room`)
};

// Close
const ioClose = (socket, id) => (dispatch) => {
  socket.emit('close', id)
};

const ioOnClose = (roomid) => (dispatch) => {
  toast(`Room ${roomid} was closed by the host`)
};


export { ioMsg, ioOnMsg, ioStart, ioOnStart, ioVote, ioOnJoin, ioOnLeave, ioClose, ioOnClose };
