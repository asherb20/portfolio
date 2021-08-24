import * as React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import { Bars, LinkedIn, GitHub, Email } from '../components/icons';
import '../styles/index.scss';

const IndexPage = ({ data }) => {
  return (
    <main>
      <nav className='nav'>
        <div className='container nav-inner'>
          <p className='nav-title'>ASHER BEST</p>
          <div className='nav-bars'>
            <Bars size={35} color='#feffff' />
          </div>
          <ul className='nav-list hide'>
            <li>
              <Link to='/#about'>About</Link>
            </li>
            <li>
              <Link to='/#projects'>Projects</Link>
            </li>
            <li>
              <Link to='/blog'>Blog</Link>
            </li>
            <li>
              <Link to='/#contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className='hero'>
        <div className='container'>
          <h1 className='hero-title'>
            Hi there, my name is <span className='text-green'>Asher Best</span>
            <br />
            I'm a JAMStack Developer
          </h1>
          <a href='/#about' className='call-to-action hero-cta'>
            Learn More
          </a>
        </div>
      </section>
      <section id='about' className='about'>
        <div className='container'>
          <h2 className='about-title'>ABOUT</h2>
          <div className='columns'>
            <div className='about-image-wrapper'>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' width={350} height={350} />
            </div>
            <div className='about-content'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <a to='#!' className='call-to-action'>
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className='projects'>
        <div className='container'>
          <h2 className='projects-title'>PROJECTS</h2>
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
      <section className='background-green'>
        <div className='text-center'>
          <h2>CONTACT</h2>
          <p>Would you like to work with me? Awesome!</p>
          <a href='mailto:ashermcbest@gmail.com' className='call-to-action cta-white margin-auto'>
            Let's Talk
          </a>
        </div>
      </section>
      <footer>
        <ul className='social-links'>
          <li>
            <a href=''>
              <LinkedIn size={50} color='#feffff' />
            </a>
          </li>
          <li>
            <a href=''>
              <GitHub size={50} color='#feffff' />
            </a>
          </li>
          <li>
            <a href=''>
              <Email size={50} circleColor='#feffff' iconColor='#17252A' />
            </a>
          </li>
        </ul>
        <p className='text-center'>© 2021 - Website designed & developed by Asher Best</p>
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
