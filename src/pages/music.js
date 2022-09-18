import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import * as styles from '../styles/music.module.css';
import BlogPostLink from '../components/blogPostLink';

export default function Programming({ data }) {
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout title='Programming | Asher Best' description="Asher Best's programming skillset and portfolio.">
      <section className={styles.section}>
        <div>
          <h1>MUSIC</h1>
          <hr className={styles.divider} />
          <p>
            I have loved music since I was a kid. The first instrument I ever learned was percussion. I started out with a snare drum, a pair of sticks and a dream in the
            sixth grade band. I soon transitioned to a full drumkit in middle school thanks to my mother. I also picked up the guitar and started learning around the same
            time. It was not until shortly after I graduated high school that I started to hone in on singing, playing shows and writing songs. I was lead singer in a band
            called <Link to='www.primeoflifeband.com'>Prime of Life</Link>. I also started my own band called Make It Make Sense. Music is and always will be a passion of
            mine.
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <h2>PROJECTS</h2>
          <hr className={styles.divider} />
          <div className={styles.columns}>
            <div className={styles.column}>
              <h3>Memory Wall</h3>
              <p>
                My latest project is an album titled <em>Memory Wall</em> that I recorded with my band Make it Make Sense. It is available on all major streaming platforms.
                The overall sound is grunge, fast-paced, high energy and melodic. However, there are songs with jazzy and acoustic elements. I wrote all of the songs
                throughout the last ten years. I am also lead singer and lead guitarist. Labrandon Bowen played drums, keys and backup vocals. Shane Stanley provided bass
                guitar and vocals. The album was recorded at <Link to='https://thekitchenstudios.net'>Kitchen Studios</Link> in Dallas, Texas. I hope you enjoy listening to
                this album as much as I enjoyed recording it!
              </p>
            </div>
            <div className={styles.column}>
              <iframe
                className={styles.playlist}
                src='https://open.spotify.com/embed/album/6q7s7kaYzbKl548e4c3Kel?utm_source=generator&theme=0'
                width='100%'
                height={425}
                frameBorder={0}
                allowfullscreen={false}
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
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

export const musicQuery = graphql`
  query MusicQuery {
    allContentfulBlogPost(filter: { category: { name: { in: "Music" } } }, sort: { order: DESC, fields: createdAt }, limit: 3) {
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
