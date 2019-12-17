import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header } from 'semantic-ui-react';
import { postEvent } from '../redux/actions/event';
import { TimeInput } from 'semantic-ui-calendar-react';

class EventPostForm extends React.Component {
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
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) this.setState({ [name]: value });
  }
  async handleSave() {
    const starttime = new Date(`${this.props.date} ${this.state.starttime}`);
    const endtime = new Date(`${this.props.date} ${this.state.endtime}`);
    const event = { ...this.state, starttime, endtime };
    const { payload } =  await this.props.postEvent(event);
    this.props.handlePost(payload);
  }

  render() {
    const { title, location, starttime, endtime } = this.state;
    const { date, loader } = this.props;

    return (
      <Form>
        <Header>Create new event on {date}</Header>
        <Form.Input
          fluid
          name="title"
          iconPosition="left"
          placeholder="Enter title"
          type="text"
          onChange={this.handleChange}
          value={title}
        />
        <br />
        <Form.Input
          fluid
          name="location"
          iconPosition="left"
          placeholder="Enter location"
          type="text"
          onChange={this.handleChange}
          value={location}
        />
        <br />
        <TimeInput
          fluid
          closable
          autoComplete='off'
          hideMobileKeyboard
          name="starttime"
          iconPosition="left"
          placeholder="Enter start time"
          type="text"
          onChange={this.handleTimeChange}
          value={starttime}
        />
        <br />
        <TimeInput
          fluid
          closable
          autoComplete='off'
          hideMobileKeyboard
          name="endtime"
          iconPosition="left"
          placeholder="Enter end time"
          type="text"
          onChange={this.handleTimeChange}
          value={endtime}
        />
        <br />
        <Button
          onClick={this.handleSave}
          fluid
          loading={loader.POST_EVENT}
        >
          Save
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;
  return { loader };
};

export default connect(mapStateToProps, { postEvent })(EventPostForm);