import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/errors';
import Navbar from './Navbar';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('jwt'),
      redirect: <></>,
    }
    this.handleNotFound = this.handleNotFound.bind(this);
    this.handleNotLoggedIn = this.handleNotLoggedIn.bind(this);
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(this.props.clearErrors);

    if (!this.state.token && this.props.protected) this.setState({ redirect: this.handleNotLoggedIn() })

  }
  UNSAFE_componentWillUpdate({ error }) {
    if (error) this.setState({redirect: this.handleNotFound(error) })
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleNotFound(error) {
    toast.error(error, { className: 'ui error message'})
    return <Redirect to={{ pathname: '/home' }} />;
  }

  handleNotLoggedIn() {
    toast.error('You must be logged in', { className: 'ui error message' })
    return <Redirect to={{ pathname: '/sign-in' }} />
  }

  render() {
    const { children, loader } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <Navbar/>
        <div style={{height: '90%', marginLeft: '10%', marginRight: '10%'}}>
          <Dimmer inverted active={loader}>
            <Loader inverted size="huge" inline="centered" />
          </Dimmer>
          <br />
          {children}
          {this.state.redirect}
        </div>
      </div>
    );
  }
}

export default connect(null, { clearErrors })(withRouter(Layout));
