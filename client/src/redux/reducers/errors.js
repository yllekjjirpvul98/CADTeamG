import { GET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
  username: '',
  password: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS: {
      const { username, password, password2 } = action.payload;

      return {
        ...state,
        username,
        password,
        password2,
      };
    }
    case CLEAR_ERRORS: {
      return { };
    }
    default:
      return state;
  }
}
