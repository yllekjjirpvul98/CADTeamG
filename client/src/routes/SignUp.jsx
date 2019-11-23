import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import SignInForm from '../components/SignInForm';

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
    const { username } = this.props;

    return (
      <Layout>
        <SignInForm isSignUp/>
        username: {username}
      </Layout>
    );
  }
}

export default connect(null, { signUp })(SignUp);
