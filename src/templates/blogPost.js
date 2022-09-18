import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/blogPost.module.css';

export default function blogPost({ pageContext }) {
  console.log(pageContext);
  const { author, content, createdAt, thumbnail, title } = pageContext;

  return (
    <Layout title={`${title} | Asher Best Blog`}>
      <section className={styles.section}>
        <div>
          <h1>{title}</h1>
          <div className={styles.description}>
            <GatsbyImage className={styles.authorImage} image={getImage(author.photo.gatsbyImageData)} alt={author.photo.title} />
            <p>
              <strong>{author.name}</strong> • {createdAt}
            </p>
          </div>
          <GatsbyImage className={styles.thumbnail} image={getImage(thumbnail.gatsbyImageData)} alt={thumbnail.title} />
          {renderRichText(content)}
        </div>
      </section>
    </Layout>
  );
}
