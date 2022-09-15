import * as React from 'react';
import { Bars, Cross } from './icons';

const NAV_LIST_LINKS = [
  { href: '/#about', text: 'About' },
  { href: '/#projects', text: 'Projects' },
  { href: '/#contact', text: 'Contact' }
];

export default function Nav({ showNavList, setShowNavList }) {
  return (
    <nav>
      <div>
        <p className='nav-title'>ASHER BEST</p>
        <button className='nav-bars' onClick={() => setShowNavList(true)}>
          <Bars size={35} color='#feffff' />
        </button>
        <div className={`nav-list-container ${showNavList ? 'nav-show' : 'nav-hide'}`}>
          <div className='nav-close'>
            <button onClick={() => setShowNavList(false)}>
              <Cross size={35} color='#feffff' />
            </button>
          </div>
          <ul className='nav-list'>
            {NAV_LIST_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setShowNavList(false)}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
