const WORDS_PER_MINUTE = 225;

// Count words in a Contentful rich-text document (JSON string from `content.raw`).
function countWords(raw) {
  if (!raw) return 0;
  let words = 0;
  const walk = (node) => {
    if (!node) return;
    if (node.nodeType === 'text' && node.value) {
      words += node.value.trim().split(/\s+/).filter(Boolean).length;
    }
    (node.content || []).forEach(walk);
  };
  try {
    walk(JSON.parse(raw));
  } catch {
    return 0;
  }
  return words;
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    // resumeUrl is null until static/resume.pdf exists, so it can't be inferred.
    `type SiteSiteMetadata {
      resumeUrl: String
    }`,
    // Optional project fields. Declared here so builds succeed before (or without)
    // these fields existing on the Contentful "Project" content type.
    `type ContentfulProject implements Node {
      techStack: [String]
      repoUrl: String
      featured: Boolean
      order: Int
    }`,
    schema.buildObjectType({
      name: 'ContentfulBlogPost',
      interfaces: ['Node'],
      fields: {
        readingTime: {
          type: 'Int',
          resolve: (source) =>
            Math.max(1, Math.round(countWords(source.content && source.content.raw) / WORDS_PER_MINUTE))
        }
      }
    })
  ]);
};

// Contentful structured data uses `_type`-style keys; JSON-LD wants `@type`.
function toJsonLd(sd) {
  if (!sd) return null;
  const rename = (obj) =>
    obj &&
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key === '_context' ? '@context' : key === '_type' ? '@type' : key === '_id' ? '@id' : key,
        value && typeof value === 'object' && !Array.isArray(value) ? rename(value) : value
      ])
    );
  return rename(sd);
}

exports.createPages = async function ({ actions, graphql, reporter }) {
  const { data, errors } = await graphql(`
    query BlogPostQuery {
      allContentfulBlogPost(sort: { dateWritten: DESC }) {
        nodes {
          id
          slug
          title
          description
          readingTime
          category {
            name
          }
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
            description
            url
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild('Error loading blog posts from Contentful', errors);
    return;
  }

  const posts = data.allContentfulBlogPost.nodes;
  const link = (post) => (post ? { title: post.title, slug: post.slug } : null);

  posts.forEach((post, index) => {
    actions.createPage({
      path: `/blog/${post.slug}/`,
      component: require.resolve('./src/templates/blogPost.js'),
      context: {
        ...post,
        structuredData: toJsonLd(post.structuredData),
        // Posts are sorted newest first: "newer" is the previous index.
        newer: link(posts[index - 1]),
        older: link(posts[index + 1])
      }
    });
  });
};
