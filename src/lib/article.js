import { createContext, useContext, useEffect, useState } from 'react';
import { ARTICLES } from '../content/index.js';

/**
 * Long-form case studies (src/content/<slug>.md, compiled by
 * scripts/articles.mjs). The prose never enters the JS bundle:
 *
 * - at build time the prerender passes every compiled article through this
 *   context, so each page's HTML carries its own article;
 * - on first load the client reads the same article from the JSON the
 *   prerender embeds in the page, so hydration sees identical markup;
 * - on a client-side navigation it fetches /content/<slug>.json.
 */
export const ArticleContext = createContext(null);

const cache = new Map();

function fromPage(slug) {
  if (typeof document === 'undefined') return undefined;
  const el = document.getElementById(`article-${slug}`);
  if (!el) return undefined;
  try {
    const article = JSON.parse(el.textContent);
    cache.set(slug, article);
    return article;
  } catch {
    return undefined;
  }
}

/** The compiled article: an object, null (no article), or undefined (loading). */
export function useArticle(slug) {
  const built = useContext(ArticleContext);
  const has = Boolean(slug) && ARTICLES.includes(slug);
  const [article, setArticle] = useState(() =>
    has ? (built?.[slug] ?? cache.get(slug) ?? fromPage(slug)) : null,
  );

  useEffect(() => {
    if (!has || article !== undefined) return undefined;
    let live = true;
    fetch(`/content/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((loaded) => {
        if (loaded) cache.set(slug, loaded);
        if (live) setArticle(loaded);
      });
    return () => {
      live = false;
    };
  }, [has, slug, article]);

  return article;
}
