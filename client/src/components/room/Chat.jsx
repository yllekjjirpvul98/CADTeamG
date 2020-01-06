import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Header, Form, Button } from 'semantic-ui-react';
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
    this.setState({ message: ''})
  }

  render() {
    const { message } = this.state;
    const { messages } = this.props;

    return (
      <Comment.Group>

        <Header as="h3" textAlign="center" dividing>
          Chat
        </Header>

        {messages.map((e, i) => (
          <Comment key={i}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as="span">{e.username}</Comment.Author>
              <Comment.Metadata>{e.time}</Comment.Metadata>
              <Comment.Text>{e.message}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form reply>
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
          <Button
            primary
            onClick={this.handleSubmit}
            fluid
          >
            Send
          </Button>
        </Form>

      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  const { session: { messages } } = state;
  return { messages };
};

export default connect(mapStateToProps, { ioMsg })(Chat);
