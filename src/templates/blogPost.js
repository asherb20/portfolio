import React, { useState } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/blogPost.module.css';
import { BLOCKS } from '@contentful/rich-text-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function BlogPost({ pageContext }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset copy status after 3 seconds
  };

  const {
    author,
    content,
    dateWritten,
    title,
    description,
    structuredData,
    thumbnail,
  } = pageContext;

  const options = {
    renderMark: {
      superscript: (text) => <sup className='superscript'>{text}</sup>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { __typename } = node.data.target;
        switch (__typename) {
          case 'ContentfulCodeSnippet':
            const {
              filePath,
              code: { code },
            } = node.data.target;
            return (
              <div className={styles.codeSection}>
                <div className={styles.codeHeader}>
                  <div>
                    <pre>
                      <code>
                        <strong>{filePath}</strong>
                      </code>
                    </pre>
                  </div>
                  <div>
                    <CopyToClipboard text={code} onCopy={onCopy}>
                      <button className={styles.copyButton}>
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
                <pre className={styles.codeBlock}>
                  <code>
                    {code.split('\n').map((line, index) => {
                      return `${index + 1}\t${line}\n`;
                    })}
                  </code>
                </pre>
              </div>
            );
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImageData, title, description } = node.data.target;
        if (!gatsbyImageData) {
          return null;
        }
        const image = getImage(gatsbyImageData);
        if (!image) {
          return null;
        }
        return (
          <div className={styles.embeddedImage}>
            <GatsbyImage image={image} alt={title} />
            <div>
              <em>{description}</em>
            </div>
          </div>
        );
      },
    },
  };

  return (
    <Layout
      title={`${title} | Asher Best Blog`}
      description={description}
      structuredData={structuredData}
    >
      <section className={styles.section}>
        <div>
          <h1>{title}</h1>
          <div className={styles.description}>
            <GatsbyImage
              image={getImage(author.photo.gatsbyImageData)}
              alt={author.photo.title}
            />
            <p>
              <strong>{author.name}</strong> • {dateWritten}
            </p>
          </div>
          {thumbnail && (
            <div>
              <GatsbyImage
                className={styles.thumbnail}
                image={getImage(thumbnail.gatsbyImageData)}
                alt={thumbnail.title}
              />
            </div>
          )}
          {renderRichText(content, options)}
        </div>
      </section>
    </Layout>
  );
}
