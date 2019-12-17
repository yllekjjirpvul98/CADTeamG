import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import EventPostForm from './EventPostForm';
import EventUpdateForm from './EventUpdateForm';
import ErrorList from './ErrorList';
import { connect } from 'react-redux';
import { getEvents } from '../redux/actions/event';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNew: false,
      modalEdit: false,
      selectedDate: null,
      selectedEvent: null,
      events: []
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handlePostEvent = this.handlePostEvent.bind(this);
    this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
  }
  async componentDidMount() {
    const { payload: { events } } = await this.props.getEvents();
    this.setState({ events })
  }
  handleDateClick(arg) {
    this.setState({ modalNew: true, selectedDate: arg.dateStr })
  }
  handleEventClick(arg) {
    this.setState({ modalEdit: true, selectedEvent: arg.event})
  }
  handlePostEvent(event) {
    this.setState({ events: this.state.events.concat(event) })
    this.setState({ modalNew: false })
  }
  handleUpdateEvent(event) {
    this.setState({ events: this.state.events.filter(e => e.id !== event.id).concat(event)  })
    this.setState({ modalEdit: false })
  }
  handleDeleteEvent(id) {
    this.setState({ events: this.state.events.filter(event => event.id !== id) })
    this.setState({ modalEdit: false })
  }
  render() {
    const { modalNew, modalEdit, selectedDate, selectedEvent } = this.state;
    const { errors } = this.props;
    let events = this.state.events.map(e => { return { ...e, start: e.starttime, end: e.endtime } })

    return (
      <>
        <FullCalendar 
          defaultView="dayGridMonth"  
          events={ events }
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin  ]} 
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
        />
        <Modal
          open={modalNew}
          onClose={() => this.setState({ modalNew: false})}
          size="small"
        >
          <Modal.Content>
            <EventPostForm date={ selectedDate } handlePost={this.handlePostEvent}/>
            <ErrorList data={ errors } />
          </Modal.Content>
        </Modal>
        <Modal
          open={modalEdit}
          onClose={() => this.setState({ modalEdit: false})}
          size="small"
        >
          <Modal.Content>
            <EventUpdateForm event={ selectedEvent } handleUpdate={this.handleUpdateEvent} handleDelete={this.handleDeleteEvent}/>
            <ErrorList data={ errors } />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errors } = state;
  return { errors };
};

export default connect(mapStateToProps, { getEvents })(Timetable);
