import { SIGN_IN, SIGN_UP, AUTH, JOIN_SESSION, HOST_SESSION, GET_SESSION, CLEAR_USER } from '../types';
import { toast } from 'react-toastify';

const initialState = {
  id: 0,
  username: '',
  session: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      toast.success('Signed in successfully', { className: "ui success message" });

      const { token } = action.payload;

      localStorage.setItem('jwt', token);

      return {
        ...state,
      };
    }
    case SIGN_UP: {
      toast.success('Signed up successfully', { className: "ui success message"});

      return {
        ...state
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
    case CLEAR_USER: {
      return initialState;
    }
    default:
      return state;
  }
}
