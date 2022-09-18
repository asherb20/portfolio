import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import Project from '../components/project';
import * as styles from '../styles/programming.module.css';
import BlogPostLink from '../components/blogPostLink';

export default function Programming({ data }) {
  const projects = data.allContentfulProject.nodes;
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout title='Programming | Asher Best' description="Asher Best's programming skillset and portfolio.">
      <section className={styles.section}>
        <div>
          <h1>PROGRAMMING</h1>
          <hr className={styles.divider} />
          <p>
            I specialize in programming languages such as HTML, CSS, JavaScript and Node.js. Frameworks I work with include React, Next.js and Gatsby. For content management
            systems, my go-to's are Sanity and Contentful. From concept to completion, I will design and develop a high quality website or application that adequately captures
            and demonstrates your company's unique vision and brand at an affordable price. I would love the opportunity to work with you! Let's build something awesome.
          </p>
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
                <BlogPostLink
                  key={post.id}
                  imageData={post.thumbnail.gatsbyImageData}
                  imageTitle={post.thumbnail.title}
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
    allContentfulBlogPost(filter: { category: { name: { in: "Programming" } } }, sort: { order: DESC, fields: createdAt }, limit: 3) {
      nodes {
        id
        slug
        thumbnail {
          title
          gatsbyImageData
        }
        title
        category {
          name
        }
      }
    }
  }
`;
