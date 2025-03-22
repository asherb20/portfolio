import React, { useState } from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import BlogPostLink from '../components/blogPostLink';
import * as styles from '../styles/blog.module.css';

export default function Blog({ data }) {
  const posts = data.allContentfulBlogPost.nodes;
  const categories = data.allContentfulBlogPostCategory.nodes;

  const [selectedCategories, setSelectedCategories] = useState(categories.map(category => category.name));

  const onCategoryChange = e => {
    setSelectedCategories(
      selectedCategories.includes(e.target.name) ? selectedCategories.filter(category => category !== e.target.name) : [...selectedCategories, e.target.name]
    );
  };

  return (
    <Layout
      title='Blog – Asher Best | DevOps, Cloud, & Software Insights'
      description='Dive into Asher Best’s blog for expert insights on DevOps, cloud computing, automation, and software development. Explore tutorials, industry trends, and best practices to stay ahead in the ever-evolving tech landscape. 🚀'
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        url: 'https://www.asherbest.com/blog',
        name: 'Blog – Asher Best',
        description:
          'Dive into Asher Best’s blog for expert insights on DevOps, cloud computing, automation, and software development. Explore tutorials, industry trends, and best practices to stay ahead in the ever-evolving tech landscape.'
      }}
    >
      <section className={styles.section}>
        <div>
          <h1>BLOG</h1>
          <hr className={styles.divider} />
          <p>
            Welcome to my blog, where I share insights, tutorials, and experiences on DevOps, cloud computing, software development, and cybersecurity. Whether you're an
            aspiring developer, a seasoned engineer, or a tech enthusiast, you'll find practical tips, industry trends, and deep dives into cutting-edge technologies.
          </p>
          <p>Join me as I explore the evolving landscape of automation, scalability, security, and innovation—one post at a time.</p>
        </div>
      </section>
      {posts.length > 0 && (
        <section className={styles.section}>
          <div>
            <div>
              {categories.map(category => (
                <button
                  name={category.name}
                  onClick={onCategoryChange}
                  key={category.id}
                  className={`${styles.button} ${selectedCategories.includes(category.name) && styles.active}`}
                >
                  {category.name.toUpperCase()}
                </button>
              ))}
            </div>
            <h2>BLOG POSTS</h2>
            <hr className={styles.divider} />
            <div className={styles.columns}>
              {posts
                .filter(post => selectedCategories.includes(post.category.name))
                .map(node => (
                  <BlogPostLink key={node.id} category={node.category.name} title={node.title} slug={node.slug} />
                ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export const blogQuery = graphql`
  query BlogQuery {
    allContentfulBlogPost(sort: { order: DESC, fields: dateWritten }) {
      nodes {
        id
        category {
          name
        }
        title
        slug
      }
    }
    allContentfulBlogPostCategory {
      nodes {
        id
        name
      }
    }
  }
`;
