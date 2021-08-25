import * as React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import { Bars, Cross, LinkedIn, GitHub, Email } from '../components/icons';
import '../styles/index.scss';

const IndexPage = ({ data }) => {
  const [showNavList, setShowNavList] = React.useState(false);

  return (
    <main>
      <nav>
        <div>
          <p className='nav-title'>ASHER BEST</p>
          <div className='nav-bars' onClick={() => setShowNavList(!showNavList)}>
            <Bars size={35} color='#feffff' />
          </div>
          <div className={`nav-list-container ${showNavList ? 'show' : 'hide'}`}>
            <div className='nav-close'>
              <Cross size={35} color='#feffff' />
            </div>
            <ul className='nav-list'>
              <li>
                <a href='/#about'>About</a>
              </li>
              <li>
                <a href='/#projects'>Projects</a>
              </li>
              <li>
                <Link to='/blog'>Blog</Link>
              </li>
              <li>
                <a href='/#contact'>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className='hero'>
        <div>
          <h1 className='section-title'>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm a JAMStack Developer
          </h1>
          <a href='/#about' className='call-to-action hero-cta'>
            Learn More
          </a>
        </div>
      </section>
      <section id='about' className='about'>
        <div>
          <h2 className='section-title about-title'>ABOUT ME</h2>
          <div className='about-card'>
            <div className='about-image-wrapper'>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' width={350} height={350} />
            </div>
            <div className='about-content'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <a href='mailto:ashermcbest@gmail.com' className='call-to-action about-cta'>
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id='projects'>
        <div>
          <h2 className='section-title projects-title'>PROJECTS</h2>
          {data.allContentfulProject.nodes.map(node => (
            <div key={node.id} className='project-card columns'>
              <div className='project-card-content'>
                <h3>{node.title}</h3>
                <p>{node.description.description}</p>
                <a href={node.siteUrl} className='call-to-action project-card-cta'>
                  See Live
                </a>
              </div>
              <div className='project-card-image'>
                <GatsbyImage image={getImage(node.previewImage.gatsbyImageData)} alt={node.previewImage.title} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id='contact' className='contact'>
        <div>
          <h2 className='section-title contact-title'>CONTACT</h2>
          <p>Would you like to work with me? Awesome!</p>
          <a href='mailto:ashermcbest@gmail.com' className='call-to-action contact-cta'>
            Let's Talk
          </a>
        </div>
      </section>
      <footer>
        <div>
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
    </main>
  );
};

export const query = graphql`
  query IndexQuery {
    allContentfulProject {
      nodes {
        id
        title
        description {
          description
        }
        siteUrl
        previewImage {
          id
          title
          gatsbyImageData
        }
      }
    }
  }
`;

export default IndexPage;
