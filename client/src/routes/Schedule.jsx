import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Calendar from '../components/schedule/Calendar';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loader } = this.props;

    return (
      <Layout protected loader={loader.GET_EVENTS}>
        <Segment secondary>
          <Calendar />
        </Segment>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;

  return { loader };
};

export default connect(mapStateToProps)(Schedule);
