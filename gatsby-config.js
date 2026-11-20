// Loads .env.development / .env.production locally. Never overrides variables already set (e.g. on Netlify).
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

const fs = require('fs');

const siteUrl = 'https://www.asherbest.com';

module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Asher Best',
    description:
      'Asher Best is a DevOps and security engineer specializing in cloud infrastructure, secure CI/CD, and reliability. Projects and writing on DevOps, cloud, cybersecurity, and space science.',
    jobTitle: 'DevOps · Security · DevSecOps Engineer',
    email: 'ashermcbest@gmail.com',
    // The résumé button only renders once static/resume.pdf exists.
    resumeUrl: fs.existsSync('./static/resume.pdf') ? '/resume.pdf' : null,
    social: {
      linkedin: 'https://www.linkedin.com/in/asher-best-16b121191/',
      github: 'https://github.com/asherb20'
    }
  },
  trailingSlash: 'always',
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: './src/images/' },
      __key: 'images'
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: { id: 'GTM-PF9WHM4' }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Asher Best',
        short_name: 'Asher Best',
        start_url: '/',
        background_color: '#17252a',
        theme_color: '#17252a',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) =>
              allContentfulBlogPost.nodes.map((post) => {
                const url = `${site.siteMetadata.siteUrl}/blog/${post.slug}/`;
                return {
                  title: post.title,
                  description: post.description,
                  date: post.dateWritten || post.createdAt,
                  url,
                  guid: url,
                  categories: post.category ? [post.category.name] : []
                };
              }),
            query: `
              {
                allContentfulBlogPost(sort: { dateWritten: DESC }) {
                  nodes {
                    slug
                    title
                    description
                    dateWritten
                    createdAt
                    category {
                      name
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Asher Best – Writing'
          }
        ]
      }
    }
  ]
};
