import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from './nav';
import Footer from './footer';

export default function Layout({
  title,
  description,
  structuredData,
  imageUrl,
  canonicalUrl,
  children,
}) {
  const schema = JSON.stringify(structuredData);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}
        {imageUrl && <meta property='og:image' content={imageUrl} />}
        <script type='application/ld+json'>{schema}</script>
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
