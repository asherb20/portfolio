import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import Project from '../components/project';
import * as styles from '../styles/programming.module.css';
import BlogPostLink from '../components/blogPostLink';
import CallToAction from '../components/callToAction';

export default function PortfolioPage({ data }) {
  const projects = data.allContentfulProject.nodes;
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout
      title='Portfolio – Asher Best | DevOps & Cloud Engineering Projects'
      description='Explore Asher Best’s portfolio of DevOps, cloud computing, and software engineering projects. From automation and CI/CD pipelines to scalable cloud solutions, see how innovation and efficiency come to life through technology. 🚀'
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        url: 'https://www.asherbest.com/portfolio',
        name: 'Portfolio – Asher Best',
        description:
          'Explore Asher Best’s portfolio of DevOps, cloud computing, and software engineering projects. From automation and CI/CD pipelines to scalable cloud solutions, see how innovation and efficiency come to life through technology.'
      }}
    >
      <section className={styles.section}>
        <div>
          <h1>PORTFOLIO</h1>
          <hr className={styles.divider} />
          <p>
            From cloud-native architectures to DevOps automation and secure software solutions, my work is driven by efficiency, scalability, and innovation. I’ve led projects
            that optimize infrastructure, enhance security, and streamline development workflows, ensuring reliability at every stage.
          </p>
          <p>
            Explore my portfolio to see real-world applications of my expertise in cloud computing, API development, automation, and software engineering. Whether it’s
            building high-performing systems, integrating advanced DevOps strategies, or developing cutting-edge applications, each project reflects my commitment to
            delivering impactful solutions.
          </p>
          <p>Let’s turn ideas into reality—one system at a time.</p>
          <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' color='green' />
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <h2>PROJECTS</h2>
          <hr className={styles.divider} />
          <div>
            {projects.map(project => (
              <Project
                key={project.id}
                title={project.title}
                description={project.description.description}
                ctaUrl={project.siteUrl}
                imageData={project.previewImage.gatsbyImageData}
                imageTitle={project.previewImage.title}
              />
            ))}
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

export const programmingQuery = graphql`
  query ProgrammingQuery {
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
