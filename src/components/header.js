import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/header.module.css';

const LINKS = [
  { href: '/#about', text: 'About' },
  { href: '/#projects', text: 'Projects' },
  { href: '/#writing', text: 'Writing' },
  { href: '/#contact', text: 'Contact' }
];

export default function Header() {
  return (
    <header className={styles.header} id='top'>
      <div className={`container ${styles.inner}`}>
        <Link to='/' className={styles.brand}>
          Asher<span>Best</span>
        </Link>
        <nav aria-label='Primary'>
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
