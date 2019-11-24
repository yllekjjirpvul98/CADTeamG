import { SIGN_IN, SIGN_UP } from '../types';

const initialState = {
  username: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      const { username, password } = action.payload;

      return {
        ...state,
        username,
        password,
      };
    }
    case SIGN_UP: {
      const { username, password } = action.payload;

      return {
        ...state,
        username,
        password,
      };
    }
    default:
      return state;
  }
}
