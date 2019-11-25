import { SET_LOADER, CLEAR_LOADER } from '../types';

const initialState = { };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADER: {
      const { payload } = action;
      const obj = { ...state };
      obj[payload] = true;
      return obj;
    }
    case CLEAR_LOADER: {
      return { };
    }
    default:
      return state;
  }
}
