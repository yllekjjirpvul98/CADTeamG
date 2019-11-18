import { UPDATE_USER } from "../actionTypes";

const initialState = {
  username: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER: {
      const { content } = action.payload;
      return {
        ...state,
        username: content
      };
    }
    default:
      return state;
  }
}
