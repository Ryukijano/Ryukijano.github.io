import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { compileArticle, CONTENT, NOTES_DIR } from '../scripts/articles.mjs';
import { ARTICLES, NOTE_ARTICLES } from '../src/content/index.js';
import { NOTES } from '../src/data/notes.js';
import { allProjects, projectFigures } from '../src/data/portfolio.js';

const DIST = resolve(import.meta.dirname, '..', 'dist');
const files = readdirSync(CONTENT).filter((f) => f.endsWith('.md'));
const noteFiles = readdirSync(NOTES_DIR).filter((f) => f.endsWith('.md'));
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

describe('notes', () => {
  it('the client list names exactly the notes on disk', () => {
    expect([...NOTE_ARTICLES].sort()).toEqual(noteFiles.map((f) => f.slice(0, -3)).sort());
  });

  it('every note on disk has its title, date and scope line, and nothing else does', () => {
    // A note without data has no route; data without a note is a page with
    // no text.
    expect(NOTES.map((n) => n.slug).sort()).toEqual([...NOTE_ARTICLES].sort());
    for (const note of NOTES) {
      for (const field of ['title', 'standfirst', 'kicker', 'date', 'scope']) {
        expect(note[field], `${note.slug}: ${field}`).toBeTruthy();
      }
      expect(Number.isInteger(note.number), `${note.slug}: number`).toBe(true);
    }
    expect(new Set(NOTES.map((n) => n.number)).size, 'two notes share a number').toBe(NOTES.length);
  });

  it('no note slug is also a project slug', () => {
    // Both are compiled into dist/content/, one folder apart; keep the two
    // name spaces from ever being confused.
    expect(NOTES.filter((n) => bySlug[n.slug]).map((n) => n.slug)).toEqual([]);
  });

  it.each(noteFiles)('%s places no figures and carries no drafting leftovers', (file) => {
    const note = compileArticle(readFileSync(join(NOTES_DIR, file), 'utf8'));
    expect(note.figures).toEqual([]);
    expect(note.chunks.join('')).not.toMatch(/TODO|TK|lorem/i);
  });

  it.each(NOTE_ARTICLES)('%s is prerendered into its page, with a JSON copy for navigation', (slug) => {
    const page = readFileSync(join(DIST, 'notes', `${slug}.html`), 'utf8');
    expect(page).toContain(`id="note-${slug}"`);
    expect(page).toContain(`href="/content/notes/${slug}.json"`);
    expect(page).toMatch(/class="note__body article"[\s\S]*?<p>/);
    expect(page).toMatch(/class="pi-label">Scope · /);
    expect(existsSync(join(DIST, 'content', 'notes', `${slug}.json`))).toBe(true);
  });
});
