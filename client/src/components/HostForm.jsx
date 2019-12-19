import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Checkbox } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { hostSession } from '../redux/actions/session';
import ErrorList from './ErrorList';

class HostFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      date: '',
      starttime: '',
      endtime: '',
      votingtime: '',
      weekends: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleHost = this.handleHost.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTimeChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  async handleHost() {
    const { payload: { id } } = await this.props.hostSession({ ...this.state });

    if (id) this.props.history.push(`/rooms/${id}`);
  }

  render() {
    const { title, location, date, starttime, endtime, votingtime, weekends } = this.state;
    const { loader, errors } = this.props;

    return (
      <>
        <Input
          name="title"
          iconPosition="left"
          placeholder="Enter title"
          type="text"
          fluid
          onChange={this.handleChange}
          value={title}
        />
        <br />
        <Input
          name="location"
          iconPosition="left"
          placeholder="Enter location"
          type="text"
          fluid
          onChange={this.handleChange}
          value={location}
        />
        <br />
        <DateInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="date"
          iconPosition="left"
          placeholder="Date"
          type="text"
          popupPosition="bottom center"
          onChange={this.handleTimeChange}
          value={date}
        />
        <br />
        <TimeInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="starttime"
          iconPosition="left"
          placeholder="Enter start time"
          popupPosition="bottom center"
          type="text"
          onChange={this.handleTimeChange}
          value={starttime}
        />
        <br />
        <TimeInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="endtime"
          iconPosition="left"
          placeholder="Enter start time"
          popupPosition="bottom center"
          type="text"
          onChange={this.handleTimeChange}
          value={endtime}
        />
        <br />
        <Input
          name="votingtime"
          iconPosition="left"
          placeholder="Enter voting time"
          type="text"
          fluid
          onChange={this.handleChange}
          value={votingtime}
        />
        <br />
        <Checkbox
          label="Weekends"
          onChange={() => this.setState({ weekends: !weekends })}
          checked={weekends}
        />
        <br />
        <br />
        <Button
          onClick={this.handleHost}
          loading={loader.HOST_SESSION}
          fluid
        >
          Host
        </Button>
        <ErrorList data={errors} />
      </>
    );
  }
}

function HostForm(props) {
  const history = useHistory();

  return (
    <HostFormComponent {...props} history={history} />
  );
}

const mapStateToProps = (state) => {
  const { loader, errors } = state;
  return { loader, errors };
};

export default connect(mapStateToProps, { hostSession })(HostForm);
