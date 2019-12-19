import { GET_EVENT, GET_EVENTS, POST_EVENT, PUT_EVENT, DELETE_EVENT } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENT: {
      const { payload } = action;

      return state.concat(payload);
    }
    case GET_EVENTS: {
      const { events } = action.payload;

      return state.concat(events);
    }
    case POST_EVENT: {
      const { payload } = action;

      return state.concat(payload);
    }
    case PUT_EVENT: {
      const { payload } = action;

      return state.filter((event) => event.id !== payload.id).concat(payload);
    }
    case DELETE_EVENT: {
      const { id } = action.payload;

      return state.filter((event) => event.id !== Number(id));
    }
    default:
      return state;
  }
}
