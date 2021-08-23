import * as React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import { Bars, LinkedIn, GitHub, Email } from '../components/icons';

const styles = {
  main: {
    backgroundColor: '#17252A',
    color: '#feffff'
  },
  nav: {
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0
  },
  navList: {
    display: 'none'
  },
  section: {
    maxWidth: 1200,
    margin: 'auto',
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  hero: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  callToAction: {
    display: 'block',
    borderWidth: 3,
    borderStyle: 'solid',
    fontSize: 24,
    fontWeight: 700,
    height: 50,
    lineHeight: '50px',
    width: 200,
    textAlign: 'center',
    textDecoration: 'none'
  }
};

const IndexPage = ({ data }) => {
  return (
    <main style={styles.main}>
      <nav style={styles.nav}>
        <p style={styles.navTitle}>ASHER BEST</p>
        <div>
          <Bars size={50} color='#feffff' />
        </div>
        <ul style={styles.navList}>
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
      </nav>
      <section style={styles.section}>
        <div style={styles.hero}>
          <h1>
            Hi there, my name is <span style={{ color: '#3AAFA9' }}>Asher Best</span>
            <br />
            I'm a JAMStack Developer
          </h1>
          <a href='/#contact' style={{ ...styles.callToAction, color: '#3AAFA9', borderColor: '#3AAFA9' }}>
            Learn More
          </a>
        </div>
      </section>
      <section>
        <div>
          <h2>ABOUT</h2>
          <div>
            <div>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' width={768} height={768} />
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Link to='#!'>Resume</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>PROJECTS</h2>
        {data.allContentfulProject.nodes.map(node => (
          <div key={node.id}>
            <div>
              <h3>{node.title}</h3>
              <p>{node.description.description}</p>
              <a href={node.siteUrl}>See Live</a>
            </div>
            <div>
              <GatsbyImage image={getImage(node.previewImage.gatsbyImageData)} alt={node.previewImage.title} />
            </div>
          </div>
        ))}
      </section>
      <section>
        <h2>CONTACT</h2>
        <p>Would you like to work with me? Awesome!</p>
        <a href='mailto:ashermcbest@gmail.com'>Let's Talk</a>
      </section>
      <footer>
        <ul>
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
        <p>© 2021 - Website designed & developed by Asher Best</p>
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
