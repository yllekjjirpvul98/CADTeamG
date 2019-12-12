import { SIGN_IN, SIGN_UP, AUTH } from '../types';

const initialState = {
  id: '',
  username: '',
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
