import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import '../styles/blogPostLink.scss';

export default function BlogPostLink({ imageData, imageTitle, category, title }) {
  return (
    <a>
      <GatsbyImage image={getImage(imageData)} alt={imageTitle} />
      <p>{category}</p>
      <h3>{title}</h3>
    </a>
  );
}
