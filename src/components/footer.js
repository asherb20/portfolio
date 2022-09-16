import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { LinkedIn, GitHub, Email, ChevronUp } from './icons';
import '../styles/footer.scss';

export default function Footer() {
  const { theme, scrollTop, setScrollTop } = useContext(LayoutContext);

  useEffect(() => {
    if (scrollTop) {
      window.scrollTo(0, 0);
      setScrollTop(false);
    }
  }, [scrollTop]);

  const color = theme === 'dark' ? '#feffff' : '#17252a';
  const iconColor = theme === 'dark' ? '#17252a' : '#feffff';
  const copyrightClassName = theme === 'dark' ? 'copyright-dark' : 'copyright-light';

  const LINKS = [
    { key: 'linkedin', href: 'https://www.linkedin.com/in/asher-best-16b121191/', icon: <LinkedIn size={50} color={color} /> },
    { key: 'github', href: 'https://github.com/asherb20', icon: <GitHub size={50} color={color} /> },
    { key: 'email', href: 'mailto:ashermcbest@gmail.com', icon: <Email size={50} circleColor={color} iconColor={iconColor} /> }
  ];

  return (
    <footer className={`theme-${theme}`}>
      <div>
        <div className='scroll-top'>
          <button onClick={() => setScrollTop(true)}>
            <ChevronUp size={25} color={color} />
          </button>
        </div>
        <ul className='social-links'>
          {LINKS.map(link => (
            <li key={link.key}>
              <a href={link.href} target='_blank' rel='noopener noreferrer'>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className={`copyright ${copyrightClassName}`}>© 2021 — Website designed & developed by Asher Best</p>
      </div>
    </footer>
  );
}
