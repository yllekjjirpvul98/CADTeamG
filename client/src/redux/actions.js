import axios from 'axios';
import { SIGN_IN, GET_ERRORS } from './types';

const signIn = () => (dispatch) => {
  axios.get('https://my-json-server.typicode.com/yllekjjirpvul98/CADTeamG/users')
    .then((res) => {
      const [user] = res.data;

      dispatch({
        type: SIGN_IN,
        payload: user,
      });
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export { signIn }