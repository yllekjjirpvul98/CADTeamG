import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Segment } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { signUp } from '../redux/actions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const { username, password, password2 } = this.state;

    this.props.signUp({ username, password, password2 });
    this.setState({ username: '', password: '', password2: '' });
  }

  render() {
    const { username, password, password2 } = this.state;

    return (
      <Layout>
        <Segment placeholder>
          <Input
            name="username"
            icon="user"
            iconPosition="left"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
          <br />
          <Input
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          <br />
          <Input
            name="password2"
            icon="lock"
            iconPosition="left"
            placeholder="Repeat Password"
            type="password"
            onChange={this.handleChange}
            value={password2}
          />
          <br />
          <Button onClick={this.handleSubmit}>Sign Up</Button>
        </Segment>
      </Layout>
    );
  }
}

export default connect(null, { signUp })(SignUp);
