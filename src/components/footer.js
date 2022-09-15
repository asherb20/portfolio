import * as React from 'react';
import { LinkedIn, GitHub, Email, ChevronUp } from './icons';
import '../styles/index.scss';

const LINKS = [
  { key: 'linkedin', href: 'https://www.linkedin.com/in/asher-best-16b121191/', icon: <LinkedIn size={50} color='#feffff' /> },
  { key: 'github', href: 'https://github.com/asherb20', icon: <GitHub size={50} color='#feffff' /> },
  { key: 'email', href: 'mailto:ashermcbest@gmail.com', icon: <Email size={50} circleColor='#feffff' iconColor='#17252A' /> }
];

export default function Foooter({ setScrollTop }) {
  return (
    <footer>
      <div>
        <div className='footer-scroll-top'>
          <button onClick={() => setScrollTop(true)}>
            <ChevronUp size={25} color='#feffff' />
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
        <p className='footer-copyright'>© 2021 — Website designed & developed by Asher Best</p>
      </div>
    </footer>
  );
}
