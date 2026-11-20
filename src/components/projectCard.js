import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { ExternalLink, GitHub } from './icons';
import * as styles from '../styles/projectCard.module.css';

export default function ProjectCard({ project }) {
  const { title, description, siteUrl, repoUrl, techStack, previewImage, featured } = project;
  const image = previewImage && getImage(previewImage.gatsbyImageData);
  const primaryUrl = siteUrl || repoUrl;

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {image &&
        (primaryUrl ? (
          <a href={primaryUrl} target='_blank' rel='noopener noreferrer' tabIndex={-1} aria-hidden='true'>
            <GatsbyImage className={styles.image} image={image} alt='' />
          </a>
        ) : (
          <GatsbyImage className={styles.image} image={image} alt={previewImage.title || title} />
        ))}
      <div className={styles.body}>
        {featured && <span className={styles.badge}>Featured</span>}
        <h3>{title}</h3>
        {description?.description && <p>{description.description}</p>}
        {techStack?.length > 0 && (
          <ul className={styles.tags} aria-label='Tech stack'>
            {techStack.map((tech) => (
              <li key={tech} className='chip'>
                {tech}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.links}>
          {siteUrl && (
            <a href={siteUrl} target='_blank' rel='noopener noreferrer'>
              <ExternalLink size={16} color='currentColor' /> Live site
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target='_blank' rel='noopener noreferrer'>
              <GitHub size={16} color='currentColor' /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
