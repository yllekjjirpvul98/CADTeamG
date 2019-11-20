import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

function Home({ username }) {
  return (
    <Layout>

      <Link to="/sign-up">Sign Up</Link>

      <br />

      <Link to="/sign-in">Sign In</Link>

      <br />

      Username: {username}

    </Layout>
  );
}

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps)(Home);
