import * as React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { Bars, Cross } from '../components/icons';
import '../styles/index.scss';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';

const IndexPage = ({ data }) => {
  const [showNavList, setShowNavList] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(false);

  React.useEffect(() => {
    if (scrollTop) {
      window.scrollTo(0, 0);
      setScrollTop(false);
    }
  }, [scrollTop]);

  return (
    <main>
      <Helmet>
        <title>Website and Application Development Portfolio | Asher Best</title>
        <meta name='description' content="Asher Best's Website and Application Development Portfolio" />
      </Helmet>
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
      <section className='hero'>
        <div>
          <h1 className='section-title'>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm an Application Developer
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
                Hi there and thank you for taking the time to check out my portfolio! My name is Asher Best and I am an Application Developer. I specialize in programming
                languages such as HTML, CSS, JavaScript and Node.js. Frameworks I work with include React, Next.js and Gatsby. For content management systems, my go-to's are
                Sanity and Contentful. From concept to completion, I will design and develop a high quality website or application that adequately captures and demonstrates
                your company's unique vision and brand at an affordable price. My email address is{' '}
                <a href='mailto:ashermcbest@gmail.com' className='about-email-link'>
                  ashermcbest@gmail.com
                </a>
                . I would love the opportunity to work with you! Let's build something awesome.
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
                <a href={node.siteUrl} className='call-to-action project-card-cta' target='_blank' rel='noopener noreferrer'>
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
      <Footer setScrollTop={setScrollTop} />
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
