import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

function Home({ username }) {
  return (
    <Layout>
      <Header as='h1' textAlign='center' >Welcome to Rendezvous</Header>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps)(Home);
