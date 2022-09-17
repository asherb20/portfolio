import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/project.module.css';
import CallToAction from './callToAction';

export default function Project({ title, description, ctaUrl, imageData, imageTitle }) {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h3>{title}</h3>
        <p>{description}</p>
        <CallToAction href={ctaUrl} text='See Live' color='green' target='_blank' rel='noopener noreferrer' />
      </div>
      <div className={styles.column}>
        <GatsbyImage className={styles.image} image={getImage(imageData)} alt={imageTitle} />
      </div>
    </div>
  );
}
