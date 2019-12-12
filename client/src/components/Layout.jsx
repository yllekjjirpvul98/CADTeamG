import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Navbar from './Navbar';

class Layout extends Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log('Route change', location, action);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const token = localStorage.getItem('jwt');
    const redirect = token === null && this.props.protected ? <Redirect to={{ pathname: '/sign-in' }} /> : <></>;

    return (
      <div style={{ paddingTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
        <Navbar />
        <br />
        {this.props.children}
        {redirect}
      </div>
    );
  }
}

export default withRouter(Layout);
