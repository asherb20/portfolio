if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: './.env.development' });

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.asherbest.com',
    title: 'Asher Best DevOps Portfolio and Blog'
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-PF9WHM4'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://www.asherbest.com`
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    }
  ],
  trailingSlash: 'always'
};
