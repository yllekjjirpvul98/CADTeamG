import { SIGN_IN, SIGN_UP, AUTH, JOIN_SESSION, HOST_SESSION, GET_SESSION } from '../types';

const initialState = {
  id: null,
  username: '',
  session: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      const { token } = action.payload;
      localStorage.setItem('jwt', token);

      return {
        ...state,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
      };
    }
    case GET_SESSION: {
      return {
        ...state,
        session: action.payload,
      };
    }
    case JOIN_SESSION: {
      return {
        ...state,
        session: action.payload,
      };
    }
    case HOST_SESSION: {
      return {
        ...state,
        session: action.payload,
      };
    }
    case AUTH: {
      const { username, id } = action.payload;

      return {
        ...state,
        username,
        id,
      };
    }
    default:
      return state;
  }
}
