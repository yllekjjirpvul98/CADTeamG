import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Input, Segment, Message, Header,
} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { signUp, clearErrors } from '../redux/actions';

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
    this.props.clearErrors();
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
        <Header as="h1" textAlign="center" style={{ marginTop: '3%' }}>Register an Account</Header>
        <Segment
          placeholder
          style={{
            width: '40%',
            marginLeft: '30%',
            marginRight: '30%',
            marginTop: '2%',
          }}
        >
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
          <Button
            loading={loader.SIGN_UP}
            onClick={this.handleSubmit}
            color="blue"
            fluid
          >
            Sign Up
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


export default connect(mapStateToProps, { signUp, clearErrors })(SignUp);
