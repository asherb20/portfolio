exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulBlogPost {
        nodes {
          id
          slug
          author {
            name
          }
          content {
            raw
          }
          createdAt
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
