import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Input, Segment, Message,
} from 'semantic-ui-react';
import { signIn, clearErrors } from '../redux/actions';
import Layout from '../components/Layout';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.props.clearErrors();
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
    const { loaders, errors } = this.props;

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
          <Button
            onClick={this.handleSubmit}
            fluid
            loading={loaders.SIGN_IN}
          >
            Sign In
          </Button>

          {Object.keys(errors).length > 0 ? (
            <Message
              compact
              error
              header="Error"
              list={Object.values(errors).map((error) => <p key={error}>{error}</p>)}
            />
          ) : <></>}
        </Segment>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { loaders, errors } = state;
  return { loaders, errors };
};

export default connect(mapStateToProps, { signIn, clearErrors })(SignIn);
