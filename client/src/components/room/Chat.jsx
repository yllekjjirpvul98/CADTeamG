import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Message } from 'semantic-ui-react';
import { ioMsg } from '../../redux/actions/socket';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.props.ioMsg(this.props.socket, this.state.message);
  }

  render() {
    const { message } = this.state;
    const { messages } = this.props;

    return (
      <Segment secondary style={{ overflow: 'auto', maxHeight: '10em' }}>
        <Form>
          <Form.Input
            name="message"
            icon="envelope"
            iconPosition="left"
            placeholder="Enter message"
            type="text"
            fluid
            onChange={this.handleChange}
            value={message}
          />
          <br />
          <Button
            onClick={this.handleSubmit}
            fluid
          >
            Send
          </Button>
            {messages.map((msg) => <Message key={msg}>{msg.username}: {msg.message}</Message>)}
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  const { session: { messages } } = state;
  return { messages };
};

export default connect(mapStateToProps, { ioMsg })(Chat);
