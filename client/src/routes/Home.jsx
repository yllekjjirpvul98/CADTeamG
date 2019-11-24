import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

function Home({ username, password }) {
  return (
    <Layout>
      username: {username}
      <br />
      password: {password}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  const { username, password } = state.user;

  return { username, password };
};

export default connect(mapStateToProps)(Home);
