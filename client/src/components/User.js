import React from "react";
import { connect } from "react-redux";

const TodoList = ({ username }) => (
  <ul>
    {username}
  </ul>
);

const mapStateToProps = state => {
  const { username } = state.user;
 
  return { username };

};

export default connect(mapStateToProps)(TodoList);
