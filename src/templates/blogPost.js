import React from 'react';
import { Link } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Layout from '../components/layout';
import Seo from '../components/seo';
import CodeBlock from '../components/codeBlock';
import * as styles from '../styles/blogPost.module.css';

const options = {
  renderMark: {
    superscript: (text) => <sup>{text}</sup>
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      const external = /^https?:\/\//.test(uri) && !uri.includes('asherbest.com');
      return (
        <a href={uri} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const target = node.data.target;
      if (target?.__typename === 'ContentfulCodeSnippet' && target.code?.code) {
        return <CodeBlock code={target.code.code} language={target.language} filePath={target.filePath} />;
      }
      return null;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, title, description } = node.data.target || {};
      const image = gatsbyImageData && getImage(gatsbyImageData);
      if (!image) return null;
      return (
        <figure className={styles.figure}>
          <GatsbyImage image={image} alt={description || title || ''} />
          {description && <figcaption>{description}</figcaption>}
        </figure>
      );
    }
  }
};

export default function BlogPost({ pageContext }) {
  const { author, category, content, dateWritten, readingTime, title, thumbnail, newer, older } = pageContext;
  const authorPhoto = author?.photo && getImage(author.photo.gatsbyImageData);
  const thumbnailImage = thumbnail && getImage(thumbnail.gatsbyImageData);

  return (
    <Layout>
      <article className={`container ${styles.article}`}>
        <Link to='/#writing' className={styles.back}>
          ← All writing
        </Link>
        <header className={styles.header}>
          {category?.name && <p className={styles.category}>{category.name}</p>}
          <h1>{title}</h1>
          <div className={styles.byline}>
            {authorPhoto && <GatsbyImage className={styles.avatar} image={authorPhoto} alt={author.photo.title || author.name} />}
            <p>
              {author?.name && <strong>{author.name}</strong>}
              {[dateWritten, readingTime && `${readingTime} min read`].filter(Boolean).map((part) => (
                <span key={part}> · {part}</span>
              ))}
            </p>
          </div>
        </header>
        {thumbnailImage && <GatsbyImage className={styles.thumbnail} image={thumbnailImage} alt={thumbnail.title || ''} />}
        <div className={styles.content}>{content && renderRichText(content, options)}</div>
        {(newer || older) && (
          <nav className={styles.pager} aria-label='More posts'>
            {older ? (
              <Link to={`/blog/${older.slug}/`}>
                <span>← Older</span>
                {older.title}
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link to={`/blog/${newer.slug}/`} className={styles.next}>
                <span>Newer →</span>
                {newer.title}
              </Link>
            )}
          </nav>
        )}
      </article>
    </Layout>
  );
}

export const Head = ({ pageContext, location }) => (
  <Seo
    title={`${pageContext.title} | Asher Best`}
    description={pageContext.description}
    pathname={location.pathname}
    image={pageContext.thumbnail?.url}
    type='article'
    structuredData={pageContext.structuredData}
  />
);
