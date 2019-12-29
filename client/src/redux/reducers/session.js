import { JOIN_SESSION, HOST_SESSION, GET_SESSION, ADD_MESSAGE, SET_TIMER, DECREMENT_TIMER, JOIN_ROOM, LEAVE_ROOM } from '../types';

const initialState = {
  messages: [],
  users: [],
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
    case JOIN_ROOM: {
      const { payload } = action;

      return { ...state, users: state.users.concat(payload) }
    }
    case LEAVE_ROOM: {
      const { payload } = action;

      return { ...state, users: state.users.filter(user => user !== payload) };
    }
    case SET_TIMER: {
      const { payload } = action;
      return { ...state, timer: payload };
    }
    case DECREMENT_TIMER: {
      const { payload } = action;

      if (state.timer <= 50) {
        clearInterval(payload);
        return { ...state, timer: null };
      }

      return { ...state, timer: state.timer - 1 };
    }
    default:
      return state;
  }
}
