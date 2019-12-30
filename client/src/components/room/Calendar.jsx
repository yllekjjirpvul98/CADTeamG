import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { connect } from 'react-redux';
import { getSessionEvents } from '../../redux/actions/session';
import { ioVote } from '../../redux/actions/socket';

const colors = ['#B03060', '#FE9A76', '#FFD700', '#32CD32', '#016936', '#008080', '#0E6EB8', '#EE82EE', '#B413EC', '#FF1493', '#A52A2A', '#A0A0A0'];

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick({ event }) {
    
    if (event.extendedProps.timeslot) this.props.ioVote(this.props.socket, event.extendedProps.timeslot)

  }

  async componentDidMount() {
    await this.props.getSessionEvents(this.props.room);
  }

  render() {
    let { events, session: { timeslots, duration } } = this.props;

    timeslots = timeslots.map((timeslot, i) => { 
      const start = new Date(timeslot)
      const end = new Date(timeslot)
      end.setMinutes(end.getMinutes() + duration)
      return { title: `Option ${i + 1}`, start: start, end, timeslot } 
    })

    const map = [...new Set(events.map((e) => e.userid))].reduce((acc, id, i) => acc.set(id, colors[i]), new Map());
    events = events.map((e) => ({ ...e, start: e.starttime, end: e.endtime, backgroundColor: map.get(e.userid), borderColor: map.get(e.userid) }));

    events = events.concat(timeslots)

    return (
      <>
        <FullCalendar
          defaultView="timeGridWeek"
          events={events}
          header={false}
          eventClick={this.handleEventClick}
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

export default connect(mapStateToProps, { getSessionEvents, ioVote })(Timetable);
