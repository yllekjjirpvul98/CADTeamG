import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import ErrorList from '../ErrorList';
import { joinSession } from '../../redux/actions/session';

class JoinFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleJoin() {
    const { payload: { id } = {}} = await this.props.joinSession({ code: this.state.code }) || {};

    if (id) this.props.history.push(`/rooms/${id}`);
  }

  render() {
    const { code } = this.state;
    const { loader, errors } = this.props;

    return (
      <>
        <Input
          fluid
          name="code"
          iconPosition="left"
          icon="hashtag"
          placeholder="Enter code"
          type="text"
          onChange={this.handleChange}
          value={code}
          error={Boolean(errors.code)}
        />
        <br />
        <Button
          onClick={this.handleJoin}
          fluid
          loading={loader.JOIN_SESSION}
          color="blue"
        >
          Join
        </Button>
        <ErrorList data={errors} />
      </>
    );
  }
}

function JoinForm(props) {
  const history = useHistory();

  return (
    <JoinFormComponent {...props} history={history} />
  );
}

const mapStateToProps = (state) => {
  const { loader, errors } = state;
  return { loader, errors };
};

export default connect(mapStateToProps, { joinSession })(JoinForm);
