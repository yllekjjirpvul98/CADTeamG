import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout'
import SignInForm from '../components/SignInForm';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
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

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps)(SignUp);
