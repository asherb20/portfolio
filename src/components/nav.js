import * as React from 'react';
import { Bars, Cross } from './icons';

const Nav = ({ showNavList, setShowNavList }) => {
  return (
    <nav>
      <div>
        <p className='nav-title'>ASHER BEST</p>
        <button className='nav-bars' onClick={() => setShowNavList(true)}>
          <Bars size={35} color='#feffff' />
        </button>
        <div className={`nav-list-container ${showNavList ? 'show' : 'hide'}`}>
          <div className='nav-close'>
            <button onClick={() => setShowNavList(false)}>
              <Cross size={35} color='#feffff' />
            </button>
          </div>
          <ul className='nav-list'>
            <li>
              <a href='/#about' onClick={() => setShowNavList(false)}>
                About
              </a>
            </li>
            <li>
              <a href='/#projects' onClick={() => setShowNavList(false)}>
                Projects
              </a>
            </li>
            <li>
              <a href='/#contact' onClick={() => setShowNavList(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
