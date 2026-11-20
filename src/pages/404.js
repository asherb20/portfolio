import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

export default function NotFound() {
  return (
    <Layout>
      <section className='container' style={{ padding: '8rem 1rem', minHeight: '60vh' }}>
        <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>404</p>
        <h1>This page doesn't exist.</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          It may have moved when the site was redesigned. Everything now lives on the home page.
        </p>
        <Link to='/' className='btn btn-primary'>
          Go home
        </Link>
      </section>
    </Layout>
  );
}

export const Head = ({ location }) => (
  <Seo
    title='Page Not Found | Asher Best'
    description='The page you are looking for does not exist or has been moved.'
    pathname={location.pathname}
  >
    <meta name='robots' content='noindex' />
  </Seo>
);
