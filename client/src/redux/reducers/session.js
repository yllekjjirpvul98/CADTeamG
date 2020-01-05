import { JOIN_SESSION, HOST_SESSION, GET_SESSION, ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, SET_WINNER, SET_TIMESLOTS, ADD_VOTE, CLEAR_SESSION, LEAVE_SESSION } from '../types';
import { toast } from 'react-toastify';

const initialState = {
  messages: [],
  participants: [],
  timeslots: {},
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
  winner: '',
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
    case ADD_VOTE: {
      const { payload: { timeslot, username } } = action;

      const timeslots = state.timeslots
      if (timeslots[timeslot]) timeslots[timeslot].push(username)
      else timeslots[timeslot] = [username]

      return { ...state, timeslots }
    }
    case LEAVE_SESSION: {
      const { id } = action.payload
      
      return { ...state, participants: state.participants.filter(e => e !== id) }
    }
    case SET_WINNER: {
      const { winner } = action.payload;

      return { ...state, winner, timer: 0 }
    }
    default:
      return state;
  }
}
