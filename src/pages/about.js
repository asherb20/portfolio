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
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: 'https://www.asherbest.com/about',
        name: 'About Asher Best',
        description:
          'Learn more about Asher Best, a DevOps leader and software engineer with a passion for automation, cloud solutions, and scalable architectures. With expertise in CI/CD, security, and infrastructure, Asher drives innovation through technology and mentorship.'
      }}
    >
      <section className={styles.section}>
        <div>
          <h1>ABOUT</h1>
          <hr className={styles.divider} />
          <div className={styles.columns}>
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
              <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' color='green' />
            </div>
            <div className={styles.column}>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' className={styles.image} />
            </div>
          </div>
        </div>
      </section>
      {posts.length > 0 && (
        <section className={styles.section}>
          <div>
            <div className={styles.row}>
              <h2>BLOG POSTS</h2>
              <Link to='/blog'>See More</Link>
            </div>
            <hr className={styles.divider} />
            <div className={styles.gallery}>
              {posts.map(post => (
                <BlogPostLink key={post.id} category={post.category.name} title={post.title} slug={post.slug} />
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
    allContentfulBlogPost(sort: { order: DESC, fields: dateWritten }, limit: 3) {
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
