import { JOIN_SESSION, HOST_SESSION, GET_SESSION, ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, SET_TIMESLOTS, SET_VOTES, ADD_VOTE, CLEAR_SESSION, LEAVE_SESSION } from '../types';
import { toast } from 'react-toastify';

const initialState = {
  messages: [],
  timeslots: [],
  participants: [],
  votes: {},
  code: '',
  endtime: '',
  location: '',
  starttime: '',
  title: '',
  votingend: '',
  votingtime: 0,
  duration: 0,
  hostId: 0,
  id: 0,
  weekends: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case JOIN_SESSION: {
      const { payload } = action;

      return { ...state, ...payload };
    }
    case HOST_SESSION: {
      const { payload } = action;

      return { ...state, ...payload };
    }
    case GET_SESSION: {
      const { payload } = action;

      return { ...state, ...payload };
    }
    case CLEAR_SESSION: {
      return initialState;
    }
    case ADD_MESSAGE: {
      const { payload } = action;

      return { ...state, messages: state.messages.concat(payload) };
    }
    case SET_TIMER: {
      const { payload } = action;

      return { ...state, timer: payload };
    }
    case DECREMENT_TIMER: {
      const { payload } = action;

      if (state.timer <= 0) {
        toast("Voting is over")
        clearInterval(payload);
        return { ...state, timer: null };
      }

      return { ...state, timer: state.timer - 1 };
    }
    case SET_TIMESLOTS: {
      const { payload } = action;

      return { ...state, timeslots: payload };
    }
    case SET_VOTES: {
      const { payload } = action;

      return { ...state, votes: payload };
    }
    case ADD_VOTE: {
      const { payload: { timeslot, username } } = action;
      const votes = state.votes
      if (votes[timeslot]) votes[timeslot].push(username)
      else votes[timeslot] = [username]

      return { ...state, votes }
    }
    case LEAVE_SESSION: {
      const { id } = action.payload
      
      return { ...state, participants: state.participants.filter(e => e !== id) }
    }
    default:
      return state;
  }
}
