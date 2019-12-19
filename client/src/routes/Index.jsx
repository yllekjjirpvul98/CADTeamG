import React from 'react';
import { Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

function Index() {

  const history = useHistory();
  
  if(localStorage.getItem('jwt')) history.push('/home')

  return (
    <Layout>
      <Header as="h1" textAlign="center">Welcome to Rendezvous</Header>
    </Layout>
  );
}

export default Index;
