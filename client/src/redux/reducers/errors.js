import { GET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS: {
      if(!action.payload) return { connection: "ERR_CONNECTION_REFUSED" } 
      return {
        ...action.payload.data,
      };
    }
    case CLEAR_ERRORS: {
      return { };
    }
    default:
      return state;
  }
}
