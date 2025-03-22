import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/blogPost.module.css';
import { BLOCKS } from '@contentful/rich-text-types';

export default function blogPost({ pageContext }) {
  const { author, content, dateWritten, title, description, structuredData } = pageContext;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const { __typename } = node.data.target;
        switch (__typename) {
          case 'ContentfulCodeSnippet':
            const {
              language,
              code: { code }
            } = node.data.target;
            return (
              <pre className={[styles.code, styles[language]]}>
                <code>{code}</code>
              </pre>
            );
          default:
            return null;
        }
      }
    }
  };

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
          {renderRichText(content, options)}
        </div>
      </section>
    </Layout>
  );
}
