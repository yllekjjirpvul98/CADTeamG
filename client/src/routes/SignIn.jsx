import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, Segment, Header, Grid } from 'semantic-ui-react';
import { signIn } from '../redux/actions/auth';
import Layout from '../components/Layout';
import ErrorList from '../components/ErrorList';

class SignInComponent extends React.Component {
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

  async handleSubmit() {
    const { username, password } = this.state;

    const { payload: { token } } = await this.props.signIn({ username, password });

    if (token) return this.props.history.push('/home');

    return this;
  }

  render() {
    const { username, password } = this.state;
    const { loader, errors } = this.props;

    return (
      <Layout>
        <Grid centered verticalAlign="middle" columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Segment secondary>
              <Header as="h1" textAlign="center">Login to Account</Header>
              <br />
              <Input
                name="username"
                icon="user"
                fluid
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
                fluid
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                value={password}
              />
              <br />
              <Button
                onClick={this.handleSubmit}
                color="blue"
                loading={loader.SIGN_IN}
                fluid
              >
                Sign In
              </Button>
              <ErrorList data={errors} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

function SignIn(props) {
  const history = useHistory();

  return (
    <SignInComponent {...props} history={history} />
  );
}

const mapStateToProps = (state) => {
  const { user, loader, errors } = state;
  return { user, loader, errors };
};

export default connect(mapStateToProps, { signIn })(SignIn);