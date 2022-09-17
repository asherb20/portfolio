import React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import CallToAction from '../components/callToAction';
import Layout from '../components/layout';
import * as styles from '../styles/index.module.css';
import Project from '../components/project';

export default function Index({ data }) {
  return (
    <Layout title='Website & Application Development Portfolio | Asher Best' description="Asher Best's website and application developmenet portfolio.">
      <section className={styles.section}>
        <div>
          <h1>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm an Application Developer
          </h1>
          <CallToAction href='/#about' text='Learn More' />
        </div>
      </section>
      <section id='about' className={`${styles.section} ${styles.backgroundGreen} ${styles.clipBottom}`}>
        <div>
          <h2>ABOUT ME</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' className={styles.image} />
            </div>
            <div className={styles.column}>
              <p>
                Thank you for taking the time to check out my portfolio! My name is Asher Best and I am an Application Developer. I specialize in programming languages such as
                HTML, CSS, JavaScript and Node.js. Frameworks I work with include React, Next.js and Gatsby. For content management systems, my go-to's are Sanity and
                Contentful. From concept to completion, I will design and develop a high quality website or application that adequately captures and demonstrates your
                company's unique vision and brand at an affordable price. I would love the opportunity to work with you! Let's build something awesome.
              </p>
              <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' color='white' />
            </div>
          </div>
        </div>
      </section>
      <section id='projects' className={styles.section}>
        <div>
          <h2>PROJECTS</h2>
          {data.allContentfulProject.nodes.map(node => (
            <Project
              key={node.id}
              title={node.title}
              description={node.description.description}
              ctaUrl={node.siteUrl}
              imageData={node.previewImage.gatsbyImageData}
              imageTitle={node.previewImage.title}
            />
          ))}
        </div>
      </section>
      <section id='contact' className={`${styles.section} ${styles.backgroundGreen} ${styles.clipTop} ${styles.centerText}`}>
        <div>
          <h2>CONTACT</h2>
          <p>Would you like to work with me? Awesome!</p>
          <CallToAction href='mailto:ashermcbest@gmail.com' text="Let's Talk" color='white' center={true} />
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
