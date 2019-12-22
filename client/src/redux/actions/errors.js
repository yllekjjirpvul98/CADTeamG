/* eslint-disable indent */
import { CLEAR_ERRORS } from '../types';

const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// eslint-disable-next-line import/prefer-default-export
export { clearErrors };
