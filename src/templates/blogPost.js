import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/blogPost.module.css';

export default function blogPost({ pageContext }) {
  const { author, content, dateWritten, title, description, structuredData } = pageContext;

  return (
    <Layout title={`${title} | Asher Best Blog`} description={description} structuredData={structuredData}>
      <section className={styles.section}>
        <div>
          <h1>{title}</h1>
          <div className={styles.description}>
            <GatsbyImage image={getImage(author.photo.gatsbyImageData)} alt={author.photo.title} />
            <p>
              <strong>{author.name}</strong> • {dateWritten}
            </p>
          </div>
          {/* <GatsbyImage className={styles.thumbnail} image={getImage(thumbnail.gatsbyImageData)} alt={thumbnail.title} /> */}
          {renderRichText(content)}
        </div>
      </section>
    </Layout>
  );
}
