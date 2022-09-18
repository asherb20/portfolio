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
          }
          createdAt(formatString: "LL")
          thumbnail {
            title
            gatsbyImageData
          }
          title
        }
      }
    }
  `);

  data.allContentfulBlogPost.nodes.forEach(node => {
    const slug = node.slug;
    actions.createPage({
      path: `/blog/${slug}`,
      component: require.resolve(`./src/templates/blogPost.js`),
      context: node
    });
  });
};
