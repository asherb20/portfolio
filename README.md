# asherbest.com

Personal portfolio and blog. Built with Gatsby 5, content from Contentful, deployed on Netlify.

## Local development

Requires Node 18+ (Netlify builds with Node 22).

Create `.env.development` (and `.env.production` for local production builds):

```
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_SPACE_ID=...
```

```sh
npm install
npm run develop   # http://localhost:8000
npm run build && npm run serve   # production build at http://localhost:9000
```

## Site structure

- `/` is a single landing page: hero + skills, About, Projects, Writing, Contact.
- `/blog/<slug>/` is generated for every Contentful **Blog Post** (`gatsby-node.js` → `src/templates/blogPost.js`).
- `/rss.xml` and `/sitemap-index.xml` are generated at build time.
- The old `/about/`, `/portfolio/`, `/blog/` pages 301-redirect to sections of the landing page (`netlify.toml`).

## Adding content (no code changes needed)

**Blog post:** publish a Blog Post entry in Contentful (title, slug, description, category, dateWritten, content, optional thumbnail). It appears in the Writing list, RSS feed and sitemap on the next build. Reading time is calculated automatically. Code snippets embedded as **Code Snippet** entries are syntax-highlighted using their `language` field (bash, python, yaml, json, docker, hcl/terraform, powershell, sql, etc.).

**Project:** publish a Project entry. Optional fields used by the project cards:

| Field | Contentful type | Effect |
|---|---|---|
| `techStack` | Short text, list | Tech tags on the card |
| `repoUrl` | Short text | "Source" link |
| `featured` | Boolean | Pinned first with a Featured badge |
| `order` | Integer | Sort order (lower first) |

These are declared in `gatsby-node.js`, so builds work whether or not they exist in Contentful yet.

**Résumé:** drop a PDF at `static/resume.pdf`; the Résumé button appears in the hero automatically.

**Skills strip:** edit `src/data/skills.js`.
