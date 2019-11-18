import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}