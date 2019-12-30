import { JOIN_SESSION, HOST_SESSION, GET_SESSION, ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, SET_TIMESLOTS, SET_VOTES } from '../types';

const initialState = {
  messages: [],
  timeslots: [],
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
    default:
      return state;
  }
}
