import React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import '../styles/index.scss';
import CallToAction from '../components/callToAction';
import Layout from '../components/layout';

export default function Index({ data }) {
  return (
    <Layout title='Website & Application Development Portfolio | Asher Best' description="Asher Best's website and application developmenet portfolio.">
      <section className='hero-section'>
        <div>
          <h1 className='section-title'>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm an Application Developer
          </h1>
          <CallToAction href='/#about' text='Learn More' className='cta cta-green' />
        </div>
      </section>
      <section id='about' className='about-section'>
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
              <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' className='cta cta-white' />
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
                <CallToAction href={node.siteUrl} text='See Live' className='cta cta-green' target='_blank' rel='noopener noreferrer' />
              </div>
              <div className='project-card-image'>
                <GatsbyImage image={getImage(node.previewImage.gatsbyImageData)} alt={node.previewImage.title} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id='contact' className='contact-section'>
        <div>
          <h2 className='section-title contact-title'>CONTACT</h2>
          <p>Would you like to work with me? Awesome!</p>
          <CallToAction href='mailto:ashermcbest@gmail.com' text="Let's Talk" className='cta cta-white' />
        </div>
      </section>
    </Layout>
  );
}

export const indexQuery = graphql`
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
