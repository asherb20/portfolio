import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from './nav';
import Footer from './footer';

export default function Layout({ title, description, structuredData, children }) {
  const schema = JSON.stringify(structuredData);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <script type='application/ld+json'>{schema}</script>
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
