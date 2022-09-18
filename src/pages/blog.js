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
    <Layout title='Blog | Asher Best' description="Asher Best's Personal and Professional Blog.">
      <section className={styles.section}>
        <div>
          <h1>BLOG</h1>
          <hr className={styles.divider} />
          <p>
            Thanks for checking out my blog! My blog posts cover various topics such as my personal life, career, programming, music, and more. Be sure to filter by category
            if you are interested in a specific topic.
          </p>
        </div>
      </section>
      {posts.length > 0 && (
        <section className={styles.section}>
          <div>
            <div className={styles.categories}>
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
      )}
    </Layout>
  );
}

export const blogQuery = graphql`
  query BlogQuery {
    allContentfulBlogPost(sort: { order: DESC, fields: createdAt }) {
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
    allContentfulBlogPostCategory {
      nodes {
        id
        name
      }
    }
  }
`;
