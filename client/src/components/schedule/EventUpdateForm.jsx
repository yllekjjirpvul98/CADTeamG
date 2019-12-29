import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header } from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';
import { updateEvent, deleteEvent } from '../../redux/actions/event';

class EventUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      endtime: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTimeChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  async handleUpdate() {
    const endtime = this.state.endtime ? new Date(`${this.props.event.end.toDateString()} ${this.state.endtime}`) : '';
    const event = { ...this.state, starttime: this.props.event.start, endtime };
    const { payload } = await this.props.updateEvent(event, this.props.event.id);
    const { id } = payload;
    if (id) this.props.closeModal();
  }

  async handleDelete() {
    const { payload: { id } } = await this.props.deleteEvent(this.props.event.id);
    if (id) this.props.closeModal();
  }

  render() {
    const { title, location, endtime } = this.state;
    const { event, loader } = this.props;

    return (
      <Form>
        <Header block textAlign="center">Update Event</Header>
        <Form.Input
          fluid
          name="title"
          iconPosition="left"
          icon="calendar outline"
          placeholder={event.title}
          type="text"
          onChange={this.handleChange}
          value={title}
        />
        <br />
        <Form.Input
          fluid
          name="location"
          iconPosition="left"
          icon="building outline"
          placeholder={event.extendedProps.location}
          type="text"
          onChange={this.handleChange}
          value={location}
        />
        <br />
        <TimeInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="endtime"
          iconPosition="left"
          placeholder={event.end.toUTCString()}
          type="text"
          onChange={this.handleTimeChange}
          value={endtime}
        />
        <br />
        <Button
          onClick={this.handleUpdate}
          fluid
          loading={loader.PUT_EVENT}
        >
          Save
        </Button>
        <br />
        <Button
          onClick={this.handleDelete}
          fluid
          loading={loader.DELETE_EVENT}
          icon="trash"
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;
  return { loader };
};

export default connect(mapStateToProps, { updateEvent, deleteEvent })(EventUpdateForm);
