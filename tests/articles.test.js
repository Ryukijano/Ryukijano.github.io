import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { compileArticle, CONTENT } from '../scripts/articles.mjs';
import { ARTICLES } from '../src/content/index.js';
import { allProjects, projectFigures } from '../src/data/portfolio.js';

const DIST = resolve(import.meta.dirname, '..', 'dist');
const files = readdirSync(CONTENT).filter((f) => f.endsWith('.md'));
const bySlug = Object.fromEntries(allProjects().map((p) => [p.slug, p]));

describe('long-form case studies', () => {
  it('the client list names exactly the articles on disk', () => {
    // The client fetches only what ARTICLES lists; a file missing from it
    // would never be shown after a client-side navigation.
    expect([...ARTICLES].sort()).toEqual(files.map((f) => f.slice(0, -3)).sort());
  });

  it.each(files)('%s belongs to a project and places only its real figures', (file) => {
    const slug = file.slice(0, -3);
    const project = bySlug[slug];
    expect(project, slug).toBeTruthy();
    const article = compileArticle(readFileSync(join(CONTENT, file), 'utf8'));
    const plates = projectFigures(project);
    for (const n of article.figures) {
      expect(n, `${slug}: figure ${n}`).toBeGreaterThanOrEqual(1);
      expect(n, `${slug}: figure ${n}`).toBeLessThanOrEqual(plates.length);
    }
    expect(new Set(article.figures).size, `${slug}: a figure placed twice`).toBe(article.figures.length);
  });

  it.each(files)('%s is a write-up, not a blurb', (file) => {
    const article = compileArticle(readFileSync(join(CONTENT, file), 'utf8'));
    const html = article.chunks.join('');
    expect(article.words).toBeGreaterThan(600);
    expect((html.match(/<h2>/g) || []).length).toBeGreaterThanOrEqual(3);
    // No drafting leftovers.
    expect(html).not.toMatch(/TODO|TK|lorem/i);
  });

  it.each(ARTICLES)('%s is prerendered into its page, with a JSON copy for navigation', (slug) => {
    const page = readFileSync(join(DIST, 'work', `${slug}.html`), 'utf8');
    expect(page).toContain(`id="article-${slug}"`);
    expect(page).toContain(`href="/content/${slug}.json"`);
    expect(page).toMatch(/class="print__body-copy article"[\s\S]*?<h2>/);
    expect(existsSync(join(DIST, 'content', `${slug}.json`))).toBe(true);
  });
});
