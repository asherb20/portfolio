import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import BlogPostLink from '../components/blogPostLink';

export default function Blog({ data }) {
  return (
    <Layout title='Blog | Asher Best' description="Asher Best's Personal and Professional Blog.">
      <section>
        <h1>Asher Best's Blog</h1>
        <p>
          Thanks for checking out my blog! My posts primarily focus on programming tips and tricks but also includes my personal and professional journey. I hope you enjoy!
        </p>
      </section>
      <section>
        <h2>All Posts</h2>
        <div className='divider' />
        <div className='blog-post-links'>
          {data.allContentfulBlogPost.nodes.map(node => (
            <BlogPostLink key={node.id} imageData={node.thumbnail.gatsbyImageData} imageTitle={node.thumbnail.title} category={node.category.name} title={node.title} />
          ))}
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
      }
    }
  }
`;
