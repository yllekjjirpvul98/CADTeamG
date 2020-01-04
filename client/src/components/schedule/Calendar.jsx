import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { connect } from 'react-redux';
import EventPostForm from './EventPostForm';
import EventUpdateForm from './EventUpdateForm';
import ErrorList from '../ErrorList';
import { getEvents } from '../../redux/actions/event';

class TimetableEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNew: false,
      modalEdit: false,
      selectedDate: null,
      selectedEvent: null,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  handleDateClick(arg) {
    this.setState({ modalNew: true, selectedDate: arg.dateStr });
  }

  handleEventClick(arg) {
    this.setState({ modalEdit: true, selectedEvent: arg.event });
  }

  handleCloseModal() {
    this.setState({ modalNew: false, modalEdit: false });
  }

  render() {
    const { modalNew, modalEdit, selectedDate, selectedEvent } = this.state;
    const { errors } = this.props;
    const events = this.props.events.map((e) => ({ ...e, start: e.starttime, end: e.endtime }));

    return (
      <>
        <FullCalendar
          defaultView="timeGridWeek"
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
        />
        <Modal
          open={modalNew}
          onClose={() => this.setState({ modalNew: false })}
          size="small"
        >
          <Modal.Content>
            <EventPostForm date={selectedDate} closeModal={this.handleCloseModal} />
            <ErrorList data={errors} />
          </Modal.Content>
        </Modal>
        <Modal
          open={modalEdit}
          onClose={() => this.setState({ modalEdit: false })}
          size="small"
        >
          <Modal.Content>
            <EventUpdateForm event={selectedEvent} closeModal={this.handleCloseModal} />
            <ErrorList data={errors} />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { events, errors } = state;
  return { events, errors };
};

export default connect(mapStateToProps, { getEvents })(TimetableEdit);
