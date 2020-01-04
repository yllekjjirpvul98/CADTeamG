import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Checkbox } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import { hostSession } from '../../redux/actions/session';
import ErrorList from '../ErrorList';

class HostFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      starttime: '',
      endtime: '',
      votingtime: '',
      duration: '',
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
    const { title, location, starttime, endtime, duration, votingtime, weekends } = this.state;
    const { loader, errors } = this.props;

    return (
      <>
        <Input
          name="title"
          iconPosition="left"
          icon="calendar outline"
          placeholder="Enter title"
          type="text"
          fluid
          onChange={this.handleChange}
          value={title}
          error={Boolean(errors.title)}
        />
        <br />
        <Input
          name="location"
          iconPosition="left"
          icon="building"
          placeholder="Enter location"
          type="text"
          fluid
          onChange={this.handleChange}
          value={location}
          error={Boolean(errors.location)}
        />
        <br />
        <DateTimeInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="starttime"
          iconPosition="left"
          placeholder="Enter earliest start time"
          popupPosition="bottom center"
          type="text"
          onChange={this.handleTimeChange}
          value={starttime}
          error={Boolean(errors.starttime)}
        />
        <br />
        <DateTimeInput
          fluid
          closable
          autoComplete="off"
          hideMobileKeyboard
          name="endtime"
          iconPosition="left"
          placeholder="Enter lastest finish time"
          popupPosition="bottom center"
          type="text"
          onChange={this.handleTimeChange}
          value={endtime}
          error={Boolean(errors.endtime)}
        />
        <br />
        <Input
          name="duration"
          iconPosition="left"
          icon="hourglass outline"
          placeholder="Enter meeting duration"
          label={{ basic: true, content: 'mins'}}
          labelPosition='right'
          type="number"
          fluid
          onChange={this.handleChange}
          value={duration}
          error={Boolean(errors.duration)}
        />
        <br />
        <Input
          name="votingtime"
          iconPosition="left"
          icon="hourglass outline"
          placeholder="Enter voting duration"
          label={{ basic: true, content: 'secs'}}
          labelPosition='right'
          type="number"
          fluid
          onChange={this.handleChange}
          value={votingtime}
          error={Boolean(errors.votingtime)}
        />
        <br />
        <Checkbox
          label="Include weekends"
          onChange={() => this.setState({ weekends: !weekends })}
          checked={weekends}
        />
        <br />
        <br />
        <Button
          onClick={this.handleHost}
          loading={loader.HOST_SESSION}
          fluid
          color="blue"
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
