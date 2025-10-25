exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query BlogPostQuery {
      allContentfulBlogPost {
        nodes {
          id
          slug
          author {
            name
            photo {
              gatsbyImageData(width: 64, height: 64)
              title
            }
          }
          content {
            raw
            references {
              ... on ContentfulCodeSnippet {
                contentful_id
                __typename
                description
                language
                filePath
                code {
                  id
                  code
                }
              }
              ... on ContentfulAsset {
                contentful_id
                __typename
                gatsbyImageData
                title
                description
              }
            }
          }
          createdAt(formatString: "LL")
          dateWritten(formatString: "LL")
          title
          description
          structuredData {
            _context
            _type
            headline
            author {
              _type
              name
              url
            }
            publisher {
              _type
              name
              url
            }
            mainEntityOfPage {
              _type
              _id
            }
            url
            datePublished
            dateModified
            description
            keywords
            articleSection
          }
          thumbnail {
            title
            gatsbyImageData
            title
            description
          }
        }
      }
    }
  `);

  const posts = data.allContentfulBlogPost.nodes;

  posts.forEach((post) => {
    const slug = post.slug;
    const structuredData = {
      '@context': post.structuredData._context,
      '@type': post.structuredData._type,
      headline: post.structuredData.headline,
      author: {
        '@type': post.structuredData.author._type,
        name: post.structuredData.author.name,
        url: post.structuredData.author.url,
      },
      publisher: {
        '@type': post.structuredData.publisher._type,
        name: post.structuredData.publisher.name,
        url: post.structuredData.publisher.url,
      },
      mainEntityOfPage: {
        '@type': post.structuredData.mainEntityOfPage._type,
        '@id': post.structuredData.mainEntityOfPage._id,
      },
      url: post.structuredData.url,
      datePublished: post.structuredData.datePublished,
      dateModified: post.structuredData.dateModified,
      description: post.structuredData.description,
      keywords: post.structuredData.keywords,
      articleSection: post.structuredData.articleSection,
    };

    actions.createPage({
      path: `/blog/${slug}/`,
      component: require.resolve(`./src/templates/blogPost.js`),
      context: { ...post, structuredData },
    });
  });
};
