import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Bars, Cross } from './icons';
import * as styles from '../styles/nav.module.css';

const NAV_LIST_LINKS = [
  { to: '/', text: 'Home' },
  { to: '/about/', text: 'About' },
  { to: '/portfolio/', text: 'Portfolio' },
  { to: '/blog/', text: 'Blog' }
];

export default function Nav() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <nav className={styles.container}>
      <div>
        <div>
          <p className={styles.title}>ASHER BEST</p>
        </div>
        <div className={styles.column}>
          <button onClick={() => setDrawerVisible(true)}>
            <Bars size={25} color='#feffff' />
          </button>
          <div className={`${styles.drawer} ${drawerVisible ? styles.drawerShow : styles.drawerHide}`}>
            <div>
              <button onClick={() => setDrawerVisible(false)}>
                <Cross size={25} color='#feffff' />
              </button>
            </div>
            <ul>
              {NAV_LIST_LINKS.map(link => (
                <li key={link.to}>
                  <Link to={link.to} onClick={() => setDrawerVisible(false)} activeClassName={styles.activeLink}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
