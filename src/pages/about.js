import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as styles from '../styles/about.module.css';
import BlogPostLink from '../components/blogPostLink';

export default function About({ data }) {
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout title='Programming | Asher Best' description="Asher Best's programming skillset and portfolio.">
      <section className={styles.section}>
        <div>
          <h1>ABOUT</h1>
          <hr className={styles.divider} />
          <div className={styles.columns}>
            <div className={styles.column}>
              <p>
                Thank you for taking the time to check out my website! I sing, write songs and play guitar. My latest project was recorded with my band,{' '}
                <a href='https://open.spotify.com/album/6q7s7kaYzbKl548e4c3Kel'>Make It Make Sense</a>. My favorite games are first person shooters such as{' '}
                <a href='https://playvalorant.com/en-us/'>Valorant</a> and <a href='https://www.halowaypoint.com/'>Halo</a>. I also enjoy a good MMORPG like{' '}
                <a href='https://worldofwarcraft.com/en-us/'>World of Warcraft</a> and <a href='https://www.newworld.com/en-us/'>New World</a>. I am an Application Developer.
                I love designing and developing applications whether it is for web or mobile. I also find cybersecurity a fascinating subject of which I spend a lot of time
                studying. Check out <Link to='/blog'>my blog</Link> where I write about my personal and professional life. Cheers!
              </p>
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

export const aboutQuery = graphql`
  query AboutQuery {
    allContentfulBlogPost(sort: { order: DESC, fields: createdAt }, limit: 3) {
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
