import React from 'react';
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';
import ProjectCard from '../components/projectCard';
import PostList from '../components/postList';
import { Download, Email, LinkedIn, Rss } from '../components/icons';
import { certifications, skills } from '../data/skills';
import { useSiteMetadata } from '../hooks';
import * as styles from '../styles/home.module.css';

const ROLES = ['DevSecOps Engineer', 'DevOps Engineer', 'Security Engineer'];
const LONGEST_ROLE = ROLES.reduce(
  (longest, role) => (role.length > longest.length ? role : longest),
  '',
);

// Featured projects first, then by the optional `order` field; unordered projects keep Contentful order.
function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
    return (
      (a.order ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? Number.MAX_SAFE_INTEGER)
    );
  });
}

export default function IndexPage({ data }) {
  const { email, social, resumeUrl } = useSiteMetadata();
  const projects = sortProjects(data.allContentfulProject.nodes);
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className='container'>
          <h1>
            <span className={styles.eyebrow}>Hi, I'm Asher Best</span>
            <span className={styles.roleContainer}>
              <span className={styles.roleMeasure}>{LONGEST_ROLE}</span>
              {ROLES.map((role, idx) => (
                <span
                  key={role}
                  className={`${styles.roleText} ${idx === 0 ? styles.roleFirst : ''}`}
                  style={{
                    animationDelay: `${idx === 0 ? 0 : (idx - ROLES.length) * 3}s`,
                  }}
                >
                  {role}
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.lede}>
            I build secure, reliable cloud infrastructure and the CI/CD
            pipelines that ship to it, on AWS and GCP, with 7+ years across
            DevOps, security, cloud engineering, and AI.
          </p>
          <div className={styles.actions}>
            <a href='#projects' className='btn btn-primary'>
              View projects
            </a>
            <a href='#writing' className='btn btn-outline'>
              Read my writing
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                className='btn btn-outline'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Download size={16} color='currentColor' /> Résumé
              </a>
            )}
          </div>
          <div className={styles.skills}>
            <ul aria-label='Certifications'>
              {certifications.map((cert) => (
                <li key={cert} className={`chip ${styles.cert}`}>
                  {cert}
                </li>
              ))}
            </ul>
            <ul aria-label='Core skills'>
              {skills.map((skill) => (
                <li key={skill} className='chip'>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <section id='about' className={styles.section}>
        <div className='container'>
          <h2 className={styles.heading}>
            <span>01</span> About me
          </h2>
          <div className={styles.about}>
            <div>
              <p>
                With 7+ years across DevOps, security, cloud engineering, and
                AI, I specialize in a space where fast delivery and secure
                infrastructure aren't in tension, they're the same goal. My
                day-to-day spans owning production reliability on Salesforce,
                AWS and GCP, securing CI/CD pipelines from code review to
                deployment, implementing AI tooling to improve productivity and
                efficiency, and building observability that actually tells you
                something useful before 3am does.
              </p>
              <p>
                I've led enterprise-scale migrations, built compliance posture
                from scratch across SOC2, NIST, and CIS frameworks, and
                introduced Agile and automation culture to teams that didn't
                have one. I hold CompTIA CySA+, Security+, and Network+
                certifications. I also hold an A.A.S. in Information Systems
                Cybersecurity and am actively pursuing a B.S. in Computer
                Science.
              </p>
              <p>
                Outside of work I'm a coder by habit. There's always a side
                project running, whether it's a neural network trained to detect
                galaxies or a Kubernetes pipeline I built for fun. I'm equally
                drawn to astrophysics, space exploration, and the growing
                intersection of AI and scientific discovery. My long-term goal
                is to bridge cloud-scale engineering with computational
                research, ideally working on systems that help us understand
                ourselves and the universe a little bit better.
              </p>
            </div>
            <StaticImage
              src='../images/asher_best.jpg'
              alt='Portrait of Asher Best'
              className={styles.photo}
              width={400}
              aspectRatio={4 / 5}
              transformOptions={{ cropFocus: 'attention' }}
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section id='projects' className={styles.section}>
          <div className='container'>
            <h2 className={styles.heading}>
              <span>02</span> Projects
            </h2>
            <p className={styles.intro}>
              From cloud-native architectures to DevOps automation and secure
              software, a selection of things I've built.
            </p>
            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <section id='writing' className={styles.section}>
          <div className='container'>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>
                <span>03</span> Writing
              </h2>
              <a href='/rss.xml' className={styles.rss}>
                <Rss size={16} color='currentColor' /> RSS
              </a>
            </div>
            <p className={styles.intro}>
              Tutorials, lessons learned, and deep dives on DevOps, cloud,
              cybersecurity, and the occasional post on space science and
              exploration.
            </p>
            <PostList posts={posts} />
          </div>
        </section>
      )}

      {/* Contact */}
      <section id='contact' className={styles.section}>
        <div className={`container ${styles.contact}`}>
          <h2 className={styles.heading}>
            <span>04</span> Let's talk
          </h2>
          <p>
            I'm open to conversations about DevOps, security, and cloud
            engineering roles, or just swapping notes on something you read
            here.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${email}`} className='btn btn-primary'>
              <Email size={16} color='currentColor' /> Email me
            </a>
            <a
              href={social.linkedin}
              className='btn btn-outline'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedIn size={16} color='currentColor' /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const Head = ({ data, location }) => {
  const { site } = data;
  const { siteUrl, description, jobTitle, social } = site.siteMetadata;
  return (
    <Seo
      title={`Asher Best – ${jobTitle} | Cloud Infrastructure, Secure CI/CD & Reliability`}
      description={description}
      pathname={location.pathname}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Asher Best',
        url: siteUrl,
        jobTitle,
        description,
        sameAs: [social.linkedin, social.github],
      }}
    />
  );
};

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteUrl
        description
        jobTitle
        social {
          linkedin
          github
        }
      }
    }
    allContentfulProject {
      nodes {
        id
        title
        description {
          description
        }
        siteUrl
        repoUrl
        techStack
        featured
        order
        previewImage {
          title
          gatsbyImageData(width: 720, aspectRatio: 1.6, placeholder: BLURRED)
        }
      }
    }
    allContentfulBlogPost(sort: { dateWritten: DESC }) {
      nodes {
        id
        slug
        title
        description
        readingTime
        dateWritten(formatString: "MMM D, YYYY")
        category {
          name
        }
      }
    }
  }
`;
