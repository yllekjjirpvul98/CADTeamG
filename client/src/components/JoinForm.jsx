import React from 'react';
import { connect } from 'react-redux';
import {
 Button, Input,
} from 'semantic-ui-react';
import { authenticate } from '../redux/actions';

class JoinForm extends React.Component {
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

  handleJoin() {
    return 0;
  }


  render() {
    const { code } = this.state;

    return (
      <>
        <Input
          fluid 
          name="code"
          iconPosition="left"
          placeholder="Enter code"
          type="text"
          onChange={this.handleChange}
          value={code}
        />
        <Button
          onClick={this.handleJoin}
          fluid
        >
          Join
        </Button>
      </>
    );
  }
}

export default JoinForm;
