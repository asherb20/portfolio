import React, { useMemo, useState } from 'react';
import { Link } from 'gatsby';
import { CategoryIcon } from './icons';
import * as styles from '../styles/postList.module.css';

const INITIAL_COUNT = 6;
const ALL = 'All';

export default function PostList({ posts }) {
  const [category, setCategory] = useState(ALL);
  const [showAll, setShowAll] = useState(false);

  // Only list categories that have at least one post, most-used first.
  const categories = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      const name = post.category?.name;
      if (name) counts[name] = (counts[name] || 0) + 1;
    });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  }, [posts]);

  const filtered = category === ALL ? posts : posts.filter((post) => post.category?.name === category);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <>
      {categories.length > 1 && (
        <div className={styles.filters} role='group' aria-label='Filter posts by category'>
          {[ALL, ...categories].map((name) => (
            <button
              key={name}
              type='button'
              aria-pressed={category === name}
              className={`${styles.filter} ${category === name ? styles.active : ''}`}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <ul className={styles.list}>
        {visible.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}/`} className={styles.post}>
              <span className={styles.icon} aria-hidden='true'>
                <CategoryIcon category={post.category?.name} size={26} />
              </span>
              <span className={styles.text}>
                <span className={styles.meta}>
                  {[post.category?.name, post.dateWritten, post.readingTime && `${post.readingTime} min read`]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <span className={styles.title}>{post.title}</span>
                {post.description && <span className={styles.description}>{post.description}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length > INITIAL_COUNT && (
        <button type='button' className='btn btn-outline' onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show fewer' : `Show all ${filtered.length} posts`}
        </button>
      )}
    </>
  );
}
