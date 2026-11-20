import { graphql, useStaticQuery } from 'gatsby';

export function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          title
          description
          jobTitle
          email
          resumeUrl
          social {
            linkedin
            github
          }
        }
      }
    }
  `);
  return site.siteMetadata;
}
