import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { connect } from 'react-redux';
import { getSessionEvents } from '../redux/actions/session';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { payload } = await this.props.getSessionEvents(this.props.room);
    console.log(payload);
  }

  render() {
    let { events } = this.props;

    const colors = ['#0000ff', '#ff0000'];
    const map = [...new Set(events.map((e) => e.userid))].reduce((acc, id, i) => acc.set(id, colors[i]), new Map());
    events = events.map((e) => ({ ...e, start: e.starttime, end: e.endtime, backgroundColor: map.get(e.userid), 
      borderColor: map.get(e.userid) }));

    return (
      <>
        <FullCalendar
          defaultView="dayGridMonth"
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { events, errors } = state;
  return { events, errors };
};

export default connect(mapStateToProps, { getSessionEvents })(Timetable);
