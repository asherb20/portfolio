import * as React from 'react';
import { LinkedIn, GitHub, Email, ChevronUp } from './icons';
import '../styles/index.scss';

const Footer = ({ setScrollTop }) => {
  return (
    <footer>
      <div>
        <div className='footer-scroll-top'>
          <button onClick={() => setScrollTop(true)}>
            <ChevronUp size={25} color='#feffff' />
          </button>
        </div>
        <ul className='footer-social-links'>
          <li>
            <a href='https://www.linkedin.com/in/asher-best-16b121191/'>
              <LinkedIn size={50} color='#feffff' />
            </a>
          </li>
          <li>
            <a href='https://github.com/asherb20'>
              <GitHub size={50} color='#feffff' />
            </a>
          </li>
          <li>
            <a href='mailto:ashermcbest@gmail.com'>
              <Email size={50} circleColor='#feffff' iconColor='#17252A' />
            </a>
          </li>
        </ul>
        <p className='footer-copyright'>© 2021 - Website designed & developed by Asher Best</p>
      </div>
    </footer>
  );
};

export default Footer;
