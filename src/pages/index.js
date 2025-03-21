import React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import CallToAction from '../components/callToAction';
import Layout from '../components/layout';
import * as styles from '../styles/index.module.css';
import Carousel from '../components/carousel';

export default function IndexPage({ data }) {
  return (
    <Layout title='DevOps Portfolio | Asher Best' description="Asher Best's DevOps portfolio.">
      <section className={styles.section}>
        <div>
          <h1>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm a Director of DevOps
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
                I'm a seasoned DevOps leader and software engineer with a passion for building scalable, secure, and high-performing systems. With expertise in cloud
                architecture, automation, and CI/CD pipelines, I specialize in streamlining development workflows and optimizing infrastructure for reliability and efficiency.
              </p>
              <p>
                Beyond my technical expertise, I am dedicated to knowledge sharing, mentoring aspiring developers, and fostering a culture of continuous improvement. Through
                my content channel, I create educational resources on coding, DevOps, and cloud technologies to empower the next generation of engineers.
              </p>
              <p>
                Whether leading DevOps initiatives, architecting cloud solutions, or guiding teams toward operational excellence, I thrive at the intersection of technology
                and innovation. Let's build something great together.
              </p>
              <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' color='white' />
            </div>
          </div>
        </div>
      </section>
      <section id='projects' className={styles.section}>
        <div>
          <h2>PORTFOLIO</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <p>
                From cloud-native architectures to DevOps automation and secure software solutions, my work is driven by efficiency, scalability, and innovation. I’ve led
                projects that optimize infrastructure, enhance security, and streamline development workflows, ensuring reliability at every stage.
              </p>
              <p>
                Explore my portfolio to see real-world applications of my expertise in cloud computing, API development, automation, and software engineering. Whether it’s
                building high-performing systems, integrating advanced DevOps strategies, or developing cutting-edge applications, each project reflects my commitment to
                delivering impactful solutions.
              </p>
              <p>Let’s turn ideas into reality—one system at a time.</p>
              <CallToAction href='/portfolio' text='See Projects' />
            </div>
            <div className={styles.column}>
              <Carousel
                slides={data.allContentfulProject.nodes.map(node => (
                  <div key={node.id} style={{ margin: '2em 0' }}>
                    <GatsbyImage image={getImage(node.previewImage.gatsbyImageData)} alt={node.previewImage.title} />
                  </div>
                ))}
              />
            </div>
          </div>
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
        previewImage {
          title
          gatsbyImageData
        }
      }
    }
  }
`;
