import React, { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { Bars, Cross, Sun, Moon } from './icons';
import '../styles/nav.scss';

const NAV_LIST_LINKS = [
  { href: '/', text: 'Home' },
  { href: '/#about', text: 'About' },
  { href: '/#projects', text: 'Projects' },
  { href: '/#contact', text: 'Contact' },
  { href: '/blog', text: 'Blog' }
];

export default function Nav() {
  const { theme, setTheme, drawerVisible, setDrawerVisible } = useContext(LayoutContext);

  const iconColor = theme === 'dark' ? '#feffff' : '#17252a';
  const themeBtnIcon = theme === 'dark' ? <Sun size={20} color={iconColor} /> : <Moon size={20} color={iconColor} />;

  return (
    <nav className={`theme-${theme}`}>
      <div>
        <p className='title'>ASHER BEST</p>
        <div className='col-right'>
          <div className='btns'>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{themeBtnIcon}</button>
            <button className='bars' onClick={() => setDrawerVisible(true)}>
              <Bars size={25} color={iconColor} />
            </button>
          </div>
          <div className={`list-container ${drawerVisible ? 'show' : 'hide'}`}>
            <div className='close'>
              <button onClick={() => setDrawerVisible(false)}>
                <Cross size={30} color='#feffff' />
              </button>
            </div>
            <ul className='list'>
              {NAV_LIST_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={`link-${theme}`} onClick={() => setDrawerVisible(false)}>
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
