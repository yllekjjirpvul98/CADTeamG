import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { clearErrors } from '../redux/actions/errors';
import Navbar from './Navbar';

class Layout extends Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log('Route change', location, action);
      this.props.clearErrors();
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
      <div style={{ height: '100%' }}>
        <Navbar />
        <div style={{height: '100%', marginLeft: '10%', marginRight: '10%' }}>
          <Dimmer inverted active={loader}>
            <Loader inverted size="huge" inline="centered" />
          </Dimmer>
          <br />
          {children}
          {redirect}
        </div>
      </div>
    );
  }
}

export default connect(null, { clearErrors })(withRouter(Layout));
