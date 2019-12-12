import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Timetable from '../components/Timetable';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout protected>
        <Dimmer inverted>
          <Loader inverted size="huge" inline="centered" />
        </Dimmer>
        <Timetable />
      </Layout>
    );
  }
}

export default Schedule;
