import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Form, Segment, Header, Message, Icon } from 'semantic-ui-react';
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

    if (payload.username) this.props.history.push('/sign-in');
  }

  render() {
    const { username, password, password2 } = this.state;
    const { loader, errors } = this.props;

    return (
      <Layout>
        <Grid centered verticalAlign="middle" columns={2} relaxed="very" stackable style={{ marginTop: '7%' }}>
          <Grid.Column>

            <Header as="h1" textAlign="center">
              Register an Account
            </Header>

            <Segment textAlign="center">

              <Form>
                <Form.Input
                  name="username"
                  icon="user"
                  fluid
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                  error={Boolean(errors.username)}
                />
                <Form.Input
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
                <Form.Input
                  name="password2"
                  icon="lock"
                  fluid
                  iconPosition="left"
                  placeholder="Repeat Password"
                  type="password"
                  onChange={this.handleChange}
                  value={password2}
                />
                <Button
                  primary
                  fluid
                  loading={loader.SIGN_UP}
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </Button>
              </Form>

              <ErrorList data={errors} />

            </Segment>

            <Message warning>
              <Icon name='help' />
              Already registered?&nbsp;<a href='/sign-in'>Login here</a>&nbsp;
            </Message>

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
