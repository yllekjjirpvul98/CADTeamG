import { JOIN_SESSION, HOST_SESSION, GET_SESSION, ADD_MESSAGE } from '../types';

const initialState = {
  messages: [],
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
    default:
      return state;
  }
}
