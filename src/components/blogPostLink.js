import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/blogPostLink.module.css';

export default function BlogPostLink({ imageData, imageTitle, category, title, slug }) {
  return (
    <Link className={styles.container} to={`/blog/${slug}`}>
      <GatsbyImage className={styles.image} image={getImage(imageData)} alt={imageTitle} />
      <p>{category.toUpperCase()}</p>
      <h3>{title}</h3>
    </Link>
  );
}
