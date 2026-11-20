import React from 'react';
import { useSiteMetadata } from '../hooks';

export default function Seo({ title, description, pathname = '/', image, type = 'website', structuredData, children }) {
  const site = useSiteMetadata();
  const url = `${site.siteUrl}${pathname}`;
  const metaDescription = description || site.description;
  const imageUrl = image && image.startsWith('//') ? `https:${image}` : image;

  return (
    <>
      <html lang='en' />
      <title>{title}</title>
      <meta name='description' content={metaDescription} />
      <link rel='canonical' href={url} />
      <meta property='og:site_name' content={site.title} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={url} />
      {imageUrl && <meta property='og:image' content={imageUrl} />}
      <meta name='twitter:card' content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={metaDescription} />
      {imageUrl && <meta name='twitter:image' content={imageUrl} />}
      {structuredData && <script type='application/ld+json'>{JSON.stringify(structuredData)}</script>}
      {children}
    </>
  );
}
