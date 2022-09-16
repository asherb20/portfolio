import React, { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { LinkedIn, GitHub, Email, ChevronUp } from './icons';
import '../styles/index.scss';

export default function Footer() {
  const { theme, setScrollTop } = useContext(LayoutContext);

  const color = theme === 'dark' ? '#feffff' : '#17252a';

  const LINKS = [
    { key: 'linkedin', href: 'https://www.linkedin.com/in/asher-best-16b121191/', icon: <LinkedIn size={50} color={color} /> },
    { key: 'github', href: 'https://github.com/asherb20', icon: <GitHub size={50} color={color} /> },
    { key: 'email', href: 'mailto:ashermcbest@gmail.com', icon: <Email size={50} circleColor={color} iconColor={theme === 'dark' ? '#17252a' : '#feffff'} /> }
  ];

  return (
    <footer>
      <div>
        <div className='footer-scroll-top'>
          <button onClick={() => setScrollTop(true)}>
            <ChevronUp size={25} color={color} />
          </button>
        </div>
        <ul className='footer-social-links'>
          {LINKS.map(link => (
            <li key={link.key}>
              <a href={link.href} target='_blank' rel='noopener noreferrer'>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className='footer-copyright' style={{ borderTop: `2px solid ${theme === 'dark' ? '#def2f1' : '#17252a'}` }}>
          © 2021 — Website designed & developed by Asher Best
        </p>
      </div>
    </footer>
  );
}
