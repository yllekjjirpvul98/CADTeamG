import { SIGN_IN } from '../types';

const initialState = {
  username: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      const { username } = action.payload;

      return {
        ...state,
        username,
      };
    }
    default:
      return state;
  }
}
