import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Segment } from 'semantic-ui-react';
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
    const { errors } = this.props;

    return (
      <Layout>
        <Segment placeholder>
          <Input
            name="username"
            icon="user"
            iconPosition="left"
            placeholder="Username"
            type="text"
            onChange={this.handleChange}
            value={username}
            error={Boolean(errors.username)}
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
            error={Boolean(errors.password)}
          />
          <br />
          <Button onClick={this.handleSubmit}>Sign In</Button>

          {/* TODO: Find a way to display errors */}
          {errors.username}
          <br />
          {errors.password}
        </Segment>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { errors } = state;
  return { errors };
};

export default connect(mapStateToProps, { signIn })(SignIn);
