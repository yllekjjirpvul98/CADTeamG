import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props; 

    return (
      <Layout>
        <Link to="/sign-in">Sign In</Link>
        <hr />
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
