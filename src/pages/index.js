import React from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import CallToAction from '../components/callToAction';
import Layout from '../components/layout';
import * as styles from '../styles/index.module.css';
import Carousel from '../components/carousel';

export default function Index({ data }) {
  return (
    <Layout title='Website & Application Development Portfolio | Asher Best' description="Asher Best's website and application developmenet portfolio.">
      <section className={styles.section}>
        <div>
          <h1>
            Hi there, my name is <span>Asher Best</span>
            <br />
            I'm a musician, programmer and gamer
          </h1>
          <CallToAction href='/#about' text='Learn More' />
        </div>
      </section>
      <section id='about' className={`${styles.section} ${styles.backgroundGreen} ${styles.clipBottom}`}>
        <div>
          <h2>ABOUT ME</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <StaticImage src='../images/asher_best.jpg' alt='Asher Best' className={styles.image} />
            </div>
            <div className={styles.column}>
              <p>
                Thank you for taking the time to check out my website! I sing, write songs and play guitar. My latest project was recorded with my band,{' '}
                <Link to='https://open.spotify.com/album/6q7s7kaYzbKl548e4c3Kel'>Make It Make Sense</Link>. My favorite games are first person shooters such as{' '}
                <Link to='https://playvalorant.com/en-us/'>Valorant</Link> and <Link to='https://www.halowaypoint.com/'>Halo</Link>. I also enjoy a good MMORPG like{' '}
                <Link to='https://worldofwarcraft.com/en-us/'>World of Warcraft</Link> and <Link to='https://www.newworld.com/en-us/'>New World</Link>. I am an Application
                Developer. I love designing and developing applications whether it is for web or mobile. I also find cybersecurity a fascinating subject of which I spend a lot
                of time studying. Check out <Link to='/blog'>my blog</Link> where I write about my personal and professional life. Cheers!
              </p>
              <CallToAction href='mailto:ashermcbest@gmail.com' text='Get In Touch' color='white' />
            </div>
          </div>
        </div>
      </section>
      <section id='projects' className={styles.section}>
        <div>
          <h2>PROGRAMMING</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <p>
                I specialize in programming languages such as HTML, CSS, JavaScript and Node.js. Frameworks I work with include React, Next.js and Gatsby. For content
                management systems, my go-to's are Sanity and Contentful. From concept to completion, I will design and develop a high quality website or application that
                adequately captures and demonstrates your company's unique vision and brand at an affordable price. I would love the opportunity to work with you! Let's build
                something awesome.
              </p>
              <CallToAction href='/programming' text='See Projects' />
            </div>
            <div className={styles.column}>
              <Carousel
                slides={data.allContentfulProject.nodes.map(node => (
                  <div key={node.id} style={{ margin: '2em 0' }}>
                    <GatsbyImage image={getImage(node.previewImage.gatsbyImageData)} alt={node.previewImage.title} />
                  </div>
                ))}
              />
            </div>
          </div>
        </div>
      </section>
      <section id='contact' className={`${styles.section} ${styles.backgroundGreen} ${styles.clipTop}`}>
        <div>
          <h2>MUSIC</h2>
          <div className={styles.columns}>
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
            <div className={styles.column}>
              <p>
                My latest project is an album titled <em>Memory Wall</em> that I recorded with my band Make it Make Sense. It is available on all major streaming platforms.
                The overall sound is grunge, fast-paced, high energy and melodic. However, there are songs with jazzy and acoustic elements. I wrote all of the songs
                throughout the last ten years. I am also lead singer and lead guitarist. Labrandon Bowen played drums, keys and backup vocals. Shane Stanley provided bass
                guitar and vocals. The album was recorded at <Link to='https://thekitchenstudios.net'>Kitchen Studios</Link> in Dallas, Texas. I hope you enjoy listening to
                this album as much as I enjoyed recording it!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const indexQuery = graphql`
  query IndexQuery {
    allContentfulProject {
      nodes {
        id
        previewImage {
          title
          gatsbyImageData
        }
      }
    }
  }
`;
