import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header } from 'semantic-ui-react';
import { updateEvent, deleteEvent } from '../redux/actions/event';
import { TimeInput } from 'semantic-ui-calendar-react';

class EventUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      starttime: '',
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
  handleTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) this.setState({ [name]: value });
  }
  async handleUpdate() {
    const starttime = new Date(`${this.props.date} ${this.state.starttime}`);
    const endtime = new Date(`${this.props.date} ${this.state.endtime}`);
    const event = { ...this.state, starttime, endtime };
    const { payload } =  await this.props.updateEvent(event, this.props.event.id);
    this.props.handleUpdate(payload);
  }
  async handleDelete() {
    const { payload } =  await this.props.deleteEvent(this.props.event.id);
    this.props.handleDelete(this.props.event.id)
  }
  render() {
    const { title, location, starttime, endtime } = this.state;
    const { event, loader } = this.props;
    
    return (
      <Form>
        <Header>Update {event.title}</Header>
        <Form.Input
          fluid
          label={event.title}
          name="title"
          iconPosition="left"
          placeholder="Update title"
          type="text"
          onChange={this.handleChange}
          value={title}
        />
        <br />
        <Form.Input
          fluid
          label={event.extendedProps.location}
          name="location"
          iconPosition="left"
          placeholder="Update location"
          type="text"
          onChange={this.handleChange}
          value={location}
        />
        <br />
        <TimeInput
          fluid
          closable
          label={event.start.toUTCString()}
          autoComplete='off'
          hideMobileKeyboard
          name="starttime"
          iconPosition="left"
          placeholder="Update start time"
          type="text"
          onChange={this.handleTimeChange}
          value={starttime}
        />
        <br />
        <TimeInput
          fluid
          closable
          label={event.end.toUTCString()}
          autoComplete='off'
          hideMobileKeyboard
          name="endtime"
          iconPosition="left"
          placeholder="Update end time"
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
          Update
        </Button>
        <Button
          onClick={this.handleDelete}
          fluid
          loading={loader.DELETE_EVENT}
        >
          Delete
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;
  return { loader };
};

export default connect(mapStateToProps, { updateEvent, deleteEvent })(EventUpdateForm);