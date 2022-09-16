import React, { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { Helmet } from 'react-helmet';
import Nav from './nav';
import Footer from './footer';

export default function Layout({ title, description, children }) {
  const { theme } = useContext(LayoutContext);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Nav />
      <main className={`theme-${theme}`}>{children}</main>
      <Footer />
    </>
  );
}
