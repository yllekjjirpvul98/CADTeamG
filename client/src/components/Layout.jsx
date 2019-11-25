import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    return (
      <div style={{ paddingTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
        <Navbar />
        <br />
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Layout);
