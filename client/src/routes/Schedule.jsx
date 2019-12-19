import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import TimetableEdit from '../components/TimetableEdit';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loader } = this.props;

    return (
      <Layout protected loader={loader.GET_EVENTS}>
        <TimetableEdit />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;

  return { loader };
};

export default connect(mapStateToProps)(Schedule);
