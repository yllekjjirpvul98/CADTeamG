import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
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
    const { children, loader, error } = this.props;
    const token = localStorage.getItem('jwt');
    let redirect = error !== undefined ? <Redirect to={{ pathname: '/home' }} /> : <></>;
    redirect = token === null && this.props.protected ? <Redirect to={{ pathname: '/sign-in' }} /> : redirect;
    return (
      <div style={{ height: '100%', paddingTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
        <Navbar />
        <Dimmer inverted active={loader}>
          <Loader inverted size="huge" inline="centered" />
        </Dimmer>
        <br />
        {children}
        {redirect}
      </div>
    );
  }
}

export default withRouter(Layout);
