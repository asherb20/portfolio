import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <a className='visually-hidden' href='#main'>
        Skip to content
      </a>
      <Header />
      <main id='main'>{children}</main>
      <Footer />
    </>
  );
}
