import React from 'react';
import '../styles/callToAction.scss';

export default function CallToAction({ href, text, className, target, rel }) {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {text}
    </a>
  );
}
