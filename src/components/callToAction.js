import React from 'react';

export default function CallToAction({ href, text, className, target, rel }) {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {text}
    </a>
  );
}
