import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/blogPostLink.module.css';
import { DevOpsIcon, WebDevIcon, SecurityIcon, CareerIcon } from './icons';

export default function BlogPostLink({ category, title, slug }) {
  let icon = <CareerIcon size={100} color='white' />;
  if (category === 'Web Development') {
    icon = <WebDevIcon size={100} color='white' />;
  } else if (category === 'DevOps') {
    icon = <DevOpsIcon size={100} color='white' />;
  } else if (category === 'Cybersecurity') {
    icon = <SecurityIcon size={75} color='white' />;
  }

  return (
    <Link className={styles.container} to={`/blog/${slug}/`}>
      <div className={styles.thumbnail}>{icon}</div>
      <p>{category.toUpperCase()}</p>
      <h3>{title}</h3>
    </Link>
  );
}
