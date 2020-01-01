import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Calendar from '../components/schedule/Calendar';
import { authenticate } from '../redux/actions/auth';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.user.id) this.props.authenticate();
  }

  render() {
    const { loader } = this.props;

    return (
      <Layout protected loader={loader.GET_EVENTS}>
        <Calendar />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loader } = state;

  return { user, loader };
};

export default connect(mapStateToProps, { authenticate })(Schedule);
