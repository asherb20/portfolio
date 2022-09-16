import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function Blog() {
  return (
    <div>
      <Helmet>
        <title>Blog | Asher Best</title>
        <meta name='description' content="Asher Best's Personal and Professional Blog." />
      </Helmet>
      <Nav />
      <main></main>
      <Footer />
    </div>
  );
}
