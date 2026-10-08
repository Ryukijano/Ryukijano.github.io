import { createContext, useContext, useEffect, useState } from 'react';
import { ARTICLES, NOTE_ARTICLES } from '../content/index.js';

/**
 * Long-form text: case studies (src/content/<slug>.md) and notes
 * (src/content/notes/<slug>.md), compiled by scripts/articles.mjs. The prose
 * never enters the JS bundle:
 *
 * - at build time the prerender passes every compiled text through this
 *   context, so each page's HTML carries its own;
 * - on first load the client reads the same text from the JSON the
 *   prerender embeds in the page, so hydration sees identical markup;
 * - on a client-side navigation it fetches the JSON copy.
 *
 * The context value is { work: { [slug]: article }, notes: { [slug]: article } }.
 */
export const ArticleContext = createContext(null);

/** Which slugs have text, and where the prerender puts it. scripts/prerender.mjs reads this too. */
export const LONG_FORM = {
  work: { slugs: ARTICLES, id: (slug) => `article-${slug}`, json: (slug) => `/content/${slug}.json` },
  notes: { slugs: NOTE_ARTICLES, id: (slug) => `note-${slug}`, json: (slug) => `/content/notes/${slug}.json` },
};

const cache = new Map();

function fromPage(id, url) {
  if (typeof document === 'undefined') return undefined;
  const el = document.getElementById(id);
  if (!el) return undefined;
  try {
    const article = JSON.parse(el.textContent);
    cache.set(url, article);
    return article;
  } catch {
    return undefined;
  }
}

/** The compiled text: an object, null (none), or undefined (loading). */
function useLongForm(kind, slug) {
  const { slugs, id, json } = LONG_FORM[kind];
  const built = useContext(ArticleContext)?.[kind];
  const has = Boolean(slug) && slugs.includes(slug);
  const url = has ? json(slug) : null;
  const [article, setArticle] = useState(() =>
    has ? (built?.[slug] ?? cache.get(url) ?? fromPage(id(slug), url)) : null,
  );

  useEffect(() => {
    if (!has || article !== undefined) return undefined;
    let live = true;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((loaded) => {
        if (loaded) cache.set(url, loaded);
        if (live) setArticle(loaded);
      });
    return () => {
      live = false;
    };
  }, [has, url, article]);

  return article;
}

export const useArticle = (slug) => useLongForm('work', slug);

export const useNote = (slug) => useLongForm('notes', slug);
