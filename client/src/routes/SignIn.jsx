import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { signIn } from '../redux/actions';
import Layout from '../components/Layout';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const { username, password } = this.state;

    this.props.signIn({ username, password });
    this.setState({ username: '', password: '' });
  }

  render() {
    const { username, password } = this.state;

    return (
      <Layout>

        <Link to="/sign-up">Sign Up</Link>

        <br />

        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={this.handleChange}
          value={username}
        />

        <br />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
          value={password}
        />

        <br />

        <Button onClick={this.handleSubmit}>Sign In</Button>

      </Layout>
    );
  }
}

export default connect(null, { signIn })(SignIn);
