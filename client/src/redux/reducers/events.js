import { GET_EVENT, GET_EVENTS, POST_EVENT, PUT_EVENT, DELETE_EVENT, GET_SESSION_EVENTS } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENT: {
      const { payload } = action;

      return state.concat(payload);
    }
    case GET_EVENTS: {
      const { events } = action.payload;

      return events;
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
    case GET_SESSION_EVENTS: {
      const { payload } = action;

      return payload.events;
    }
    default:
      return state;
  }
}
