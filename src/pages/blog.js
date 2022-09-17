import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import BlogPostLink from '../components/blogPostLink';
import * as styles from '../styles/blog.module.css';

export default function Blog({ data }) {
  return (
    <Layout title='Blog | Asher Best' description="Asher Best's Personal and Professional Blog.">
      <section className={styles.section}>
        <div>
          <h1>Asher Best's Blog</h1>
          <p>
            Thanks for checking out my blog! My posts primarily focus on programming tips and tricks but also includes my personal and professional journey. I hope you enjoy!
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <h2>All Posts</h2>
          <div className={styles.columns}>
            {data.allContentfulBlogPost.nodes.map(node => (
              <BlogPostLink
                key={node.id}
                imageData={node.thumbnail.gatsbyImageData}
                imageTitle={node.thumbnail.title}
                category={node.category.name}
                title={node.title}
                slug={node.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const blogQuery = graphql`
  query BlogQuery {
    allContentfulBlogPost {
      nodes {
        id
        thumbnail {
          gatsbyImageData
          title
        }
        category {
          name
        }
        title
        slug
      }
    }
  }
`;
