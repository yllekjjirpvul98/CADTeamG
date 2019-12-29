import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Input, Segment, Header } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { signUp } from '../redux/actions/auth';
import ErrorList from '../components/ErrorList';

class SignUpComponent extends React.Component {
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

  async handleSubmit() {
    const { username, password, password2 } = this.state;

    const { payload } = await this.props.signUp({ username, password, password2 });

    if (payload.message) this.props.history.push('/sign-in');
  }

  render() {
    const { username, password, password2 } = this.state;
    const { loader, errors } = this.props;

    return (
      <Layout>
        <Grid centered verticalAlign="middle" columns={2} relaxed="very" stackable style={{ marginTop: '7%' }}>
          <Grid.Column>
            <Segment secondary textAlign="center">
              <Header as="h1" textAlign="center">Register an Account</Header>
              <br />
              <Input
                name="username"
                icon="user"
                fluid
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                error={Boolean(errors.username)}
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
                error={Boolean(errors.password)}
              />
              <br />
              <Input
                name="password2"
                icon="lock"
                fluid
                iconPosition="left"
                placeholder="Repeat Password"
                type="password"
                onChange={this.handleChange}
                value={password2}
              />
              <br />
              <Button
                loading={loader.SIGN_UP}
                onClick={this.handleSubmit}
                color="blue"
              >
                Sign Up
              </Button>
              <ErrorList data={errors} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

function SignUp(props) {
  const history = useHistory();

  return (
    <SignUpComponent {...props} history={history} />
  );
}

const mapStateToProps = (state) => {
  const { loader, errors } = state;
  return { loader, errors };
};


export default connect(mapStateToProps, { signUp })(SignUp);
