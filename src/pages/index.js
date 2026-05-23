import React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import CallToAction from '../components/callToAction';
import Layout from '../components/layout';
import * as styles from '../styles/index.module.css';
import Carousel from '../components/carousel';

export default function IndexPage({ data }) {
  const roles = ['DevOps Engineer', 'Security Engineer', 'DevSecOps Engineer'];
  const longestRole = roles.reduce(
    (longest, role) => (role.length > longest.length ? role : longest),
    '',
  );

  return (
    <Layout
      title='Asher Best – DevOps · Security · DevSecOps Engineer | Cloud Infrastructure, Secure CI/CD & Reliability'
      description='Explore the portfolio of Asher Best, a DevOps leader and security engineer specializing in cloud engineering, DevOps automation, and secure infrastructure. From CI/CD to security and infrastructure, discover expertise that powers innovation. 🚀'
      cannonicalUrl='https://www.asherbest.com/'
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Asher Best',
        url: 'https://www.asherbest.com',
        jobTitle: 'DevOps · Security · DevSecOps Engineer',
        description:
          'Explore the portfolio of Asher Best, a DevOps leader and security engineer specializing in cloud engineering, DevOps automation, and secure infrastructure. From CI/CD to security and infrastructure, discover expertise that powers innovation.',
        sameAs: [
          'https://www.linkedin.com/in/asherbest',
          'https://github.com/asherbest',
        ],
      }}
    >
      <section className={styles.section}>
        <div>
          <h1>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm a{' '}
            <span className={styles.roleContainer}>
              <span className={styles.roleMeasure}>{longestRole}</span>
              {roles.map((role, idx) => (
                <span
                  key={role}
                  className={styles.roleText}
                  style={{ animationDelay: `${idx * 3}s` }}
                >
                  {role}
                </span>
              ))}
            </span>
          </h1>
          <CallToAction href='/#about' text='Learn More' />
        </div>
      </section>
      <section
        id='about'
        className={`${styles.section} ${styles.backgroundGreen} ${styles.clipBottom}`}
      >
        <div>
          <h2>ABOUT ME</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <StaticImage
                src='../images/asher_best.jpg'
                alt='Asher Best'
                className={styles.image}
              />
            </div>
            <div className={styles.column}>
              <p>
                With 7+ years across DevOps, security, and cloud engineering, I
                specialize in the space where fast delivery and secure
                infrastructure aren't in tension, they are the same goal. My
                day-to-day spans owning production reliability on AWS and GCP,
                securing CI/CD pipelines from code review to deployment, and
                building observability that actually tells you something useful
                before 3am does.
              </p>
              <p>
                I've led enterprise-scale migrations, built compliance posture
                from scratch across SOC2, NIST, and CIS frameworks, and
                introduced Agile and automation culture to teams that didn't
                have one. I hold CompTIA CySA+, Security+, and Network+
                certifications and am actively pursuing a B.S. in Computer
                Science and an A.A.S. in Information Systems Cybersecurity.
              </p>
              <p>
                Outside of work I'm a coder by habit. There's always a side
                project running, whether it's a neural network trained to detect
                galaxies or a Kubernetes pipeline I built for fun. I'm equally
                drawn to astrophysics, space exploration, and the growing
                intersection of AI and scientific discovery. My long-term goal
                is to bridge cloud-scale engineering with computational
                research, ideally working on systems that help us understand the
                universe a little better.
              </p>
              <CallToAction
                href='mailto:ashermcbest@gmail.com'
                text='Get In Touch'
                color='white'
              />
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
                From cloud-native architectures to DevOps automation and secure
                software solutions, my work is driven by efficiency,
                scalability, innovation, and security. I’ve led projects that
                optimize infrastructure, enhance security, and streamline
                development workflows, ensuring reliability at every stage.
              </p>
              <p>
                Explore my portfolio to see real-world applications of my
                expertise in cloud computing, API development, automation, and
                software engineering. Whether it’s building high-performing
                systems, integrating advanced DevOps strategies, or developing
                cutting-edge applications, each project reflects my commitment
                to delivering impactful solutions.
              </p>
              <p>Let’s turn ideas into reality, one system at a time.</p>
              <CallToAction href='/portfolio' text='See Projects' />
            </div>
            <div className={styles.column}>
              <Carousel
                slides={data.allContentfulProject.nodes.map((node) => (
                  <div key={node.id} style={{ margin: '2em 0' }}>
                    <GatsbyImage
                      image={getImage(node.previewImage.gatsbyImageData)}
                      alt={node.previewImage.title}
                    />
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
