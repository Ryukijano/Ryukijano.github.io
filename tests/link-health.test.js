// @vitest-environment node
/**
 * Every internal link the site emits must land on a real page.
 *
 * This is the single highest-value assertion in the suite, because the repo's
 * actual editing activity is content: renaming a project changes its URL, and
 * PersonaPage derives /work/<slug> from projectSlug(title) independently of
 * allProjects(), so the two can drift apart with nothing to say so. It also
 * catches slug collisions, where findProject() returns the first match and the
 * second project becomes quietly unreachable.
 *
 * It runs against dist/, so it checks the artifact that actually ships rather
 * than a model of it. Run `npm run build` first.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { allProjects, findProject, projectSlug } from '../src/data/portfolio.js';
import { allRoutes, routeMeta } from '../src/lib/routeMeta.js';

const DIST = new URL('../dist/', import.meta.url).pathname;

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

let pages;

beforeAll(() => {
  if (!existsSync(DIST)) throw new Error('dist/ is missing — run `npm run build` first');
  pages = walk(DIST)
    .filter((f) => f.endsWith('.html'))
    .map((f) => ({ file: f.slice(DIST.length), html: readFileSync(f, 'utf8') }));
  expect(pages.length).toBeGreaterThan(20); // anti-vacuity: 28 routes + 404
});

/** A route resolves if the prerender step wrote a file for it. */
function resolves(path) {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (clean === '/') return existsSync(join(DIST, 'index.html'));
  return (
    existsSync(join(DIST, `${clean.slice(1)}.html`)) ||
    existsSync(join(DIST, clean.slice(1), 'index.html')) ||
    existsSync(join(DIST, clean.slice(1))) // static files: /seal.svg, the CV
  );
}

describe('internal links', () => {
  it('every href on every page lands on a real file', () => {
    const broken = [];
    for (const { file, html } of pages) {
      for (const m of html.matchAll(/href="(\/[^"#]*)"/g)) {
        if (!resolves(m[1])) broken.push(`${file} -> ${m[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('PersonaPage\'s independently derived slugs still match allProjects()', () => {
    // PersonaPage does `/work/${projectSlug(project.title)}`; the catalogue
    // uses allProjects()[].slug. If those ever diverge, persona links 404.
    const drifted = allProjects().filter((p) => projectSlug(p.title) !== p.slug);
    expect(drifted.map((p) => p.title)).toEqual([]);
  });

  it('every project slug round-trips through findProject', () => {
    const missing = allProjects().filter((p) => findProject(p.slug)?.slug !== p.slug);
    expect(missing.map((p) => p.title)).toEqual([]);
  });

  it('no two projects collide on a slug', () => {
    // findProject returns the FIRST match, so a collision silently shadows the
    // second project everywhere it is linked.
    const slugs = allProjects().map((p) => p.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it('no slug is empty', () => {
    // A title with no [a-z0-9] slugs to '', whose link is /work/ -- which
    // normalises to the catalogue, so the project becomes unreachable.
    expect(allProjects().filter((p) => !p.slug).map((p) => p.title)).toEqual([]);
  });

  it('resolves the case study a persona link actually points at, in the right lane', () => {
    // A shared title across two lanes would resolve to a real page -- the
    // wrong one. Only a lane check catches that.
    for (const p of allProjects()) {
      expect(findProject(projectSlug(p.title)).laneId, p.title).toBe(p.laneId);
    }
  });
});

describe('static assets the pages reference', () => {
  it('every asset referenced from a page exists in dist/', () => {
    const missing = new Set();
    for (const { html } of pages) {
      for (const m of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:jpe?g|png|webp|avif|svg|pdf|css|js|woff2?))"/g)) {
        if (!existsSync(join(DIST, m[1].slice(1)))) missing.add(m[1]);
      }
      for (const m of html.matchAll(/(\/[^\s",]+\.(?:webp|avif|jpe?g|png))\s+\d+w/g)) {
        if (!existsSync(join(DIST, m[1].slice(1)))) missing.add(m[1]);
      }
    }
    expect([...missing]).toEqual([]);
  });

  it('the CV is a real PDF', () => {
    const cv = join(DIST, 'resume/Gyanateet_Dutta_Resume_updated.pdf');
    expect(existsSync(cv)).toBe(true);
    expect(readFileSync(cv).subarray(0, 4).toString()).toBe('%PDF');
  });

  it('the OG image is the 1200x630 it declares', () => {
    // A wrong-sized card letterboxes in Slack and Twitter and nothing else
    // in the suite would notice.
    const buf = readFileSync(join(DIST, 'assets/images/og-plate.jpg'));
    let i = 2;
    let dims = null;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        dims = { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
        break;
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    expect(dims).toEqual({ w: 1200, h: 630 });
  });
});

describe('external links', () => {
  it('all open safely', () => {
    // No network: an attribute check, so it is instant and never flaky.
    const unsafe = [];
    for (const { file, html } of pages) {
      for (const m of html.matchAll(/<a\s[^>]*href="(https?:[^"]+)"[^>]*>/g)) {
        const tag = m[0];
        if (!/rel="[^"]*noopener/.test(tag) || !/rel="[^"]*noreferrer/.test(tag)) {
          unsafe.push(`${file} -> ${m[1]}`);
        }
      }
    }
    expect(unsafe).toEqual([]);
  });

  it('every URL in the content data is a well-formed http(s) URL', () => {
    const bad = [];
    const check = (v) => {
      if (typeof v !== 'string' || !/^https?:/.test(v)) return;
      try {
        const u = new URL(v);
        if (!['http:', 'https:'].includes(u.protocol) || !u.hostname.includes('.')) bad.push(v);
      } catch { bad.push(v); }
    };
    const walkValue = (v) => {
      if (Array.isArray(v)) v.forEach(walkValue);
      else if (v && typeof v === 'object') Object.values(v).forEach(walkValue);
      else check(v);
    };
    walkValue(allProjects());
    expect(bad).toEqual([]);
  });
});

describe('the prerender manifest', () => {
  it('writes a file for every route it claims', () => {
    const missing = allRoutes().filter((r) => !resolves(r));
    expect(missing).toEqual([]);
  });

  it('gives each route its own title', () => {
    const titles = allRoutes().map((r) => routeMeta(r).title);
    // 4 persona URLs collapse to 3 people, so allow that one overlap.
    expect(new Set(titles).size).toBeGreaterThanOrEqual(allRoutes().length - 1);
  });

  it('canonicalises the /persona/gyanateet alias to /persona/yana', () => {
    expect(routeMeta('/persona/gyanateet').canonical).toBe('/persona/yana');
    expect(routeMeta('/persona/yana').canonical).toBe('/persona/yana');
  });

  it('keeps the alias out of the sitemap', () => {
    const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
    expect(sitemap).not.toContain('/persona/gyanateet');
    expect(sitemap).toContain('/persona/yana');
  });

  it('renders 404.html from a not-found route, not from the home page', () => {
    const notFound = readFileSync(join(DIST, '404.html'), 'utf8');
    expect(notFound).toContain('noindex');
    expect(notFound).not.toContain('rel="canonical"');
    expect(notFound).toMatch(/This path isn(&#x27;|')t on the site/);
  });

  it('preloads the plate on the home page only', () => {
    // It was preloaded everywhere, costing each text-only case study 286 KB
    // of an image that page never displays. The FONT preload is on every page
    // by design, so this looks for the image one specifically.
    const withPlate = pages
      .filter((p) => /rel="preload"[^>]*as="image"/.test(p.html))
      .map((p) => p.file);
    expect(withPlate).toEqual(['index.html']);
  });

  it('preloads the display serif on every page', () => {
    const withFont = pages.filter((p) => /rel="preload"[^>]*as="font"/.test(p.html));
    expect(withFont.length).toBe(pages.length);
  });

  it('requests no third-party origin at all', () => {
    // The Google Fonts link cost two sequential round trips before text could
    // paint in its intended face.
    for (const { file, html } of pages) {
      expect(html, file).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
      expect(html, file).not.toMatch(/rel="preconnect"/);
    }
  });
});
