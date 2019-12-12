import React from 'react';
import { Input, Button } from 'semantic-ui-react';

class HostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleHost = this.handleHost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleHost() {
    return 0;
  }


  render() {
    const { code } = this.state;

    return (
      <>
        <Input
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
          Host
        </Button>
      </>
    );
  }
}

export default HostForm;
