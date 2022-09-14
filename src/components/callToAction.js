import React from 'react';

const CallToAction = ({ href, text, className, target, rel }) => {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {text}
    </a>
  );
};

export default CallToAction;
