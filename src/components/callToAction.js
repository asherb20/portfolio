import React from 'react';
import * as styles from '../styles/callToAction.module.css';

export default function CallToAction({ href, text, color = 'green', target, rel, center = false }) {
  let className = `${styles.container} ${styles[color]}`;
  if (center) className += ` ${styles.center}`;

  return (
    <a href={href} className={className} target={target} rel={rel}>
      {text}
    </a>
  );
}
