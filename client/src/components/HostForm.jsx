import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Checkbox } from 'semantic-ui-react';
import { hostSession } from '../redux/actions/session';
import ErrorList from './ErrorList';

class HostFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      duration: '',
      starttime: '',
      endtime: '',
      votingtime: '',
      weekends: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleHost = this.handleHost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleHost() {
    const { payload: { id } } =  await this.props.hostSession({ ...this.state });
    console.log(id)
    if(id) this.props.history.push(`/rooms/${id}`)
  }

  render() {
    const { title, location, duration, starttime, endtime, votingtime, weekends } = this.state;
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
        <Input
          name="duration"
          iconPosition="left"
          placeholder="Enter duration"
          type="text"
          fluid
          onChange={this.handleChange}
          value={duration}
        />
        <br />
        <Input
          name="starttime"
          iconPosition="left"
          placeholder="Enter start time"
          type="text"
          fluid
          onChange={this.handleChange}
          value={starttime}
        />
        <br />
        <Input
          name="endtime"
          iconPosition="left"
          placeholder="Enter end time"
          type="text"
          fluid
          onChange={this.handleChange}
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
          label='Weekends'
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
        <ErrorList data={errors}/>
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
