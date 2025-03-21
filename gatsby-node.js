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
          dateWritten(formatString: "LL")
          title
        }
      }
    }
  `);

  const posts = data.allContentfulBlogPost.nodes;

  posts.forEach(post => {
    const slug = post.slug;
    actions.createPage({
      path: `/blog/${slug}`,
      component: require.resolve(`./src/templates/blogPost.js`),
      context: post
    });
  });
};
