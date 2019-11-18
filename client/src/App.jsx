
import UpdateUser from "./components/UpdateUser";
import User from "./components/User";

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>User</h1>
        <User />
        <UpdateUser />
      </div>
    )
  }
}