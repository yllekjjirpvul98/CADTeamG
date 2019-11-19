import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/sign-in">Sign In</Link>
    </Layout>
  );
}
