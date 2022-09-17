import React from 'react';
// import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';

export default function blogPost({ pageContext }) {
  console.log(pageContext);
  return (
    <Layout title={`${pageContext.title} | Asher Best's Blog`}>
      <section>
        <div>
          <h1>{pageContext.title}</h1>
        </div>
      </section>
    </Layout>
  );
}
