import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from './nav';
import Footer from './footer';

export default function Layout({ title, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
