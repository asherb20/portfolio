import * as React from 'react';
import { Bars, Cross, Sun, Moon } from './icons';

const NAV_LIST_LINKS = [
  { href: '/#about', text: 'About' },
  { href: '/#projects', text: 'Projects' },
  { href: '/#contact', text: 'Contact' }
];

export default function Nav({ theme, setTheme, showNavList, setShowNavList }) {
  return (
    <nav className={`nav-${theme}`}>
      <div>
        <p className='nav-title'>ASHER BEST</p>
        <div className='nav-col-right'>
          <div className='nav-btns'>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={20} color='#feffff' /> : <Moon size={20} color='#17252a' />}
            </button>
            <button className='nav-bars' onClick={() => setShowNavList(true)}>
              <Bars size={25} color={theme === 'dark' ? '#feffff' : '#17252a'} />
            </button>
          </div>
          <div className={`nav-list-container ${showNavList ? 'nav-show' : 'nav-hide'}`}>
            <div className='nav-close'>
              <button onClick={() => setShowNavList(false)}>
                <Cross size={30} color='#feffff' />
              </button>
            </div>
            <ul className='nav-list'>
              {NAV_LIST_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={`nav-link-${theme}`} onClick={() => setShowNavList(false)}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
