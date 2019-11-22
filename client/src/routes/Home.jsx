import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import { Header } from 'semantic-ui-react';

export default function Home() {
  return (
    <Layout>
      <Header as='h1' textAlign='center' >Welcome to Rendezvous</Header>
    </Layout>
  );
}
