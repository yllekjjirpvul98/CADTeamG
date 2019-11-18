import { UPDATE_USER } from "./actionTypes";

let nextTodoId = 0;

export const updateUser = content => ({
  type: UPDATE_USER,
  payload: {
    id: ++nextTodoId,
    content
  }
});
