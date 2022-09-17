import React, { useState, useEffect } from 'react';
import { LinkedIn, GitHub, Email, ChevronUp } from './icons';
import * as styles from '../styles/footer.module.css';

export default function Footer() {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    if (scrollTop) {
      window.scrollTo(0, 0);
      setScrollTop(false);
    }
  }, [scrollTop]);

  const LINKS = [
    { key: 'linkedin', href: 'https://www.linkedin.com/in/asher-best-16b121191/', icon: <LinkedIn size={50} color='#feffff' /> },
    { key: 'github', href: 'https://github.com/asherb20', icon: <GitHub size={50} color='#feffff' /> },
    { key: 'email', href: 'mailto:ashermcbest@gmail.com', icon: <Email size={50} circleColor='#feffff' iconColor='#17252a' /> }
  ];

  return (
    <footer className={styles.container}>
      <div>
        <button onClick={() => setScrollTop(true)}>
          <ChevronUp size={25} color='#feffff' />
        </button>
      </div>
      <ul>
        {LINKS.map(link => (
          <li key={link.key}>
            <a href={link.href} target='_blank' rel='noopener noreferrer'>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <p>© {new Date().getFullYear()} — Website designed & developed by Asher Best</p>
    </footer>
  );
}
