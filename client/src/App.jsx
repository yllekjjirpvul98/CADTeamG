import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import Index from './routes/Index';
import axios from './utils/axios';

export default function App() {
  axios.defaults.headers.common.authorization = localStorage.getItem('jwt');

  return (
    <Router>
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}
