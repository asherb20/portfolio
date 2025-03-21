import * as React from 'react';
import * as styles from '../styles/index.module.css';
import Layout from '../components/layout';
import CallToAction from '../components/callToAction';

export default function NotFound() {
  return (
    <Layout title='Page Not Found | Asher Best' description='The page you are looking for does not exist or has been moved.'>
      <section className={styles.section}>
        <div>
          <h1>
            <span>404</span> Page Not Found
            <br />
            This page does not exist.
          </h1>
          <CallToAction href='/' text='Go Home' />
        </div>
      </section>
    </Layout>
  );
}
