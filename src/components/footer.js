import React from 'react';
import { LinkedIn, GitHub, Email, Rss } from './icons';
import { useSiteMetadata } from '../hooks';
import * as styles from '../styles/footer.module.css';

export default function Footer() {
  const { social, email } = useSiteMetadata();
  const links = [
    { label: 'LinkedIn', href: social.linkedin, icon: <LinkedIn size={22} color='currentColor' /> },
    { label: 'GitHub', href: social.github, icon: <GitHub size={22} color='currentColor' /> },
    { label: 'Email', href: `mailto:${email}`, icon: <Email size={22} color='currentColor' /> },
    { label: 'RSS feed', href: '/rss.xml', icon: <Rss size={20} color='currentColor' /> }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© {new Date().getFullYear()} Asher Best. Designed &amp; built by me.</p>
        <ul className={styles.social}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} aria-label={link.label} target={link.href.startsWith('http') ? '_blank' : undefined} rel='noopener noreferrer'>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
        <a href='#top' className={styles.top}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
