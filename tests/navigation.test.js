// @vitest-environment node
/**
 * GitHub Pages serves every prerendered file at <path> and <path>.html
 * alike. If the suffix reached resolveRoute the slug would match nothing
 * and hydration would swap a real page for the 404 — that is how the
 * case-study loops once vanished on .html links.
 */
import { describe, expect, it } from 'vitest';
import { normalizePath, resolveRoute } from '../src/lib/navigation.js';
import { allProjects } from '../src/data/portfolio.js';
import { NOTES } from '../src/data/notes.js';

describe('normalizePath', () => {
  it('folds the spellings Pages serves onto the clean route', () => {
    expect(normalizePath('/work/cuda-blackwell-labs.html')).toBe('/work/cuda-blackwell-labs');
    expect(normalizePath('/work/cuda-blackwell-labs.html/')).toBe('/work/cuda-blackwell-labs');
    expect(normalizePath('/notes/beige-pc.html')).toBe('/notes/beige-pc');
    expect(normalizePath('/index.html')).toBe('/');
    expect(normalizePath('/work/index.html')).toBe('/work');
    expect(normalizePath('/figures.html')).toBe('/figures');
    expect(normalizePath('/404.html')).toBe('/404');
  });

  it('leaves clean paths and unknown paths alone', () => {
    expect(normalizePath('/work/cuda-blackwell-labs')).toBe('/work/cuda-blackwell-labs');
    expect(normalizePath('/work/')).toBe('/work');
    expect(normalizePath('/no-such-place')).toBe('/no-such-place');
    expect(normalizePath('')).toBe('/');
  });
});

describe('resolveRoute', () => {
  const slugs = allProjects().map((project) => project.slug);

  it('resolves every case study under its .html spelling too', () => {
    for (const slug of slugs) {
      expect(resolveRoute(`/work/${slug}.html`)).toEqual({ kind: 'case-study', slug });
    }
  });

  it('resolves every note under its .html spelling too', () => {
    for (const { slug } of NOTES) {
      expect(resolveRoute(`/notes/${slug}.html`)).toEqual({ kind: 'note', slug });
    }
  });

  it('still 404s a slug that never existed', () => {
    const route = resolveRoute('/work/not-a-project.html');
    expect(route.slug).toBe('not-a-project');
  });
});
