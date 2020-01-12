import { ADD_MESSAGE, ENTER_ROOM, LEAVE_ROOM, CLEAR_WEBSOCKET } from '../types';
import { toast } from 'react-toastify';

const avatars = ['elliot', 'matt', 'jenny', 'joe', 'stevie', 'christian', 'steve']

const initialState = {
  users: [],
  messages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { payload } = action;

      return { ...state, messages: state.messages.concat(payload) };
    }
    case ENTER_ROOM: {
      const { id, username } = action.payload;
      
      toast(`${username} has joined the room`)

      return { ...state, users: state.users.concat({ id, username })}
    }
    case LEAVE_ROOM: {
      const { id, username } = action.payload; 

      toast(`${username} has left the room`)

      return { ...state, users: state.users.filter((user) => user.id !== id) }
    }
    case CLEAR_WEBSOCKET: {
      return initialState;
    }
    default:
      return state;
  }
}
