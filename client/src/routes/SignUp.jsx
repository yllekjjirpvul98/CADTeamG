import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { signUp } from '../redux/actions';
import Layout from '../components/Layout';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const { username, password, repassword } = this.state;

    this.props.signUp({ username, password, repassword });
    this.setState({ username: '', password: '' });
  }

  render() {
    const { username, password, repassword } = this.state;

    return (
      <Layout>

        <Link to="/sign-in">Sign In</Link>

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

        <Input
          type="password"
          placeholder="Repeat password"
          name="repassword"
          onChange={this.handleChange}
          value={repassword}
        />

        <br />

        <Button onClick={this.handleSubmit}>Sign Up</Button>

      </Layout>
    );
  }
}

export default connect(null, { signUp })(SignUp);
