// @vitest-environment node
/**
 * The /figures gallery: six case-study stills kept with their captions and
 * scopes, plus three redrawn studies. Runs against dist/, so build first.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GALLERY_CASE_STUDIES, GALLERY_STUDIES } from '../src/data/figures.js';
import { findProject, projectFigures } from '../src/data/portfolio.js';
import { allRoutes, routeMeta } from '../src/lib/routeMeta.js';

const DIST = new URL('../dist/', import.meta.url).pathname;
const ROOT = new URL('../', import.meta.url).pathname;
const page = () => readFileSync(join(DIST, 'figures.html'), 'utf8');

describe('the /figures route', () => {
  it('is a canonical route with its own title', () => {
    expect(allRoutes()).toContain('/figures');
    expect(routeMeta('/figures').canonical).toBe('/figures');
    expect(routeMeta('/figures').title).toMatch(/^Pinned figures/);
  });

  it('is prerendered and listed in the sitemap', () => {
    expect(existsSync(join(DIST, 'figures.html')), 'dist/figures.html is missing — build first').toBe(true);
    expect(readFileSync(join(DIST, 'sitemap.xml'), 'utf8')).toContain(
      '<loc>https://ryukijano.github.io/figures</loc>',
    );
  });

  it('is reachable from the site nav', () => {
    expect(page()).toMatch(/<a[^>]*href="\/figures"[^>]*>\s*Figures\s*<\/a>/);
  });
});

describe('the six case-study cards', () => {
  it('names six real figures from six real projects', () => {
    expect(GALLERY_CASE_STUDIES).toHaveLength(6);
    for (const [slug, n] of GALLERY_CASE_STUDIES) {
      const project = findProject(slug);
      expect(project, slug).toBeTruthy();
      expect(projectFigures(project)[n - 1], `${slug} figure ${n}`).toBeTruthy();
    }
    // Six projects, not one project six times.
    expect(new Set(GALLERY_CASE_STUDIES.map(([slug]) => slug)).size).toBe(6);
  });

  it('shows stills, never a GIF mid-frame', () => {
    for (const [slug, n] of GALLERY_CASE_STUDIES) {
      const figure = projectFigures(findProject(slug))[n - 1];
      const still = figure.poster ?? figure.src;
      expect(still, slug).not.toMatch(/\.gif$/i);
      expect(page(), slug).toContain(`src="${still}"`);
    }
    expect(page()).not.toMatch(/\.gif"/);
    expect(page()).not.toContain('<video');
  });

  it('keeps every caption and scope line word for word', () => {
    const html = page();
    for (const [slug, n] of GALLERY_CASE_STUDIES) {
      const figure = projectFigures(findProject(slug))[n - 1];
      expect(html, `${slug} caption`).toContain(figure.caption);
      expect(html, `${slug} scope`).toContain(figure.scope);
    }
  });

  it('links every card back to its case study', () => {
    const html = page();
    for (const [slug] of GALLERY_CASE_STUDIES) {
      expect(html, slug).toContain(`href="/work/${slug}"`);
    }
  });

  it('ships no heavy still', () => {
    const CAP = 700_000;
    for (const [slug, n] of GALLERY_CASE_STUDIES) {
      const figure = projectFigures(findProject(slug))[n - 1];
      const file = join(DIST, (figure.poster ?? figure.src).slice(1));
      expect(existsSync(file), slug).toBe(true);
      expect(statSync(file).size, slug).toBeLessThan(CAP);
    }
  });
});

describe('the three studies', () => {
  it('caption each as a redrawn study, never a result', () => {
    expect(GALLERY_STUDIES).toHaveLength(3);
    const html = page();
    for (const study of GALLERY_STUDIES) {
      expect(study.caption).toMatch(/redrawn after a pinned reference/);
      expect(study.scope).toMatch(/Not a result/);
      expect(html, study.id).toContain(study.caption);
      expect(html, study.id).toContain(study.scope);
      expect(html, study.id).toContain(study.alt);
    }
  });

  it('draws in ink tokens only, naming no colour', () => {
    for (const study of GALLERY_STUDIES) {
      const svg = readFileSync(join(ROOT, 'media', `${study.id}.svg`), 'utf8');
      expect(svg, study.id).not.toMatch(/#[0-9a-f]{3,8}\b/i);
      expect(svg, study.id).not.toMatch(/rgba?\(|hsla?\(/i);
      const classes = [...svg.matchAll(/class="([^"]+)"/g)].map((m) => m[1]);
      expect(classes.length, study.id).toBeGreaterThan(0);
      for (const cls of classes) {
        expect(['ink', 'muted-stroke', 'ink-fill', 'muted-fill'], study.id).toContain(cls);
      }
      expect(svg, study.id).not.toMatch(/blur|gradient|filter/i);
    }
  });

  it('records how each was drawn', () => {
    const readme = readFileSync(join(ROOT, 'media/README.md'), 'utf8');
    for (const study of GALLERY_STUDIES) {
      expect(readme, study.id).toContain(`${study.id}.svg`);
    }
  });
});
