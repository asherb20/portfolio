import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as styles from '../styles/about.module.css';
import BlogPostLink from '../components/blogPostLink';
import CallToAction from '../components/callToAction';

export default function About({ data }) {
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout
      title='About Asher Best – DevOps Leader & Cloud Engineer'
      description='Learn more about Asher Best, a DevOps leader and software engineer with a passion for automation, cloud solutions, and scalable architectures. With expertise in CI/CD, security, and infrastructure, Asher drives innovation through technology and mentorship. 🚀'
      canonicalUrl='https://www.asherbest.com/about/'
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: 'https://www.asherbest.com/about/',
        name: 'About Asher Best',
        description:
          'Learn more about Asher Best, a DevOps leader and software engineer with a passion for automation, cloud solutions, and scalable architectures. With expertise in CI/CD, security, and infrastructure, Asher drives innovation through technology and mentorship.',
      }}
    >
      <section className={styles.section}>
        <div>
          <h1>ABOUT</h1>
          <hr className={styles.divider} />
          <div className={styles.columns}>
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
                color='green'
              />
            </div>
            <div className={styles.column}>
              <StaticImage
                src='../images/asher_best.jpg'
                alt='Asher Best'
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>
      {posts.length > 0 && (
        <section className={styles.section}>
          <div>
            <div className={styles.row}>
              <h2>BLOG POSTS</h2>
              <Link to='/blog/'>See More</Link>
            </div>
            <hr className={styles.divider} />
            <div className={styles.gallery}>
              {posts.map((post) => (
                <BlogPostLink
                  key={post.id}
                  category={post.category.name}
                  title={post.title}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export const aboutQuery = graphql`
  query AboutQuery {
    allContentfulBlogPost(
      sort: { order: DESC, fields: dateWritten }
      limit: 3
    ) {
      nodes {
        id
        slug
        title
        category {
          name
        }
      }
    }
  }
`;
