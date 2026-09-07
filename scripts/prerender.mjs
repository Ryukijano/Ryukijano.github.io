/**
 * Emits one real HTML file per route, so a deep link is a 200 with its own
 * <title> and OG tags rather than a 404 whose body happens to be the app.
 *
 * Why this exists: GitHub Pages has no rewrites, so the site previously
 * shipped 404.html as a copy of index.html. That fixes the *body* but leaves
 * the *status* at 404, and crawlers and link unfurlers gate on status before
 * they parse — so no amount of client-side document.title could ever make a
 * shared case-study link present correctly.
 *
 * Flat files (dist/work/<slug>.html), not directories: Pages serves an
 * extensionless .html at 200 with no redirect, while a directory index 301s to
 * add a trailing slash — an extra round trip on every pasted link.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const SSR = join(ROOT, 'dist-ssr', 'entry-server.js');

const { render, allRoutes, routeMeta, PLATE, ORIGIN, OG_IMAGE, OG_IMAGE_ALT } =
  await import(SSR);

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The responsive preload, generated from the same PLATE the <picture> uses. */
function preloadTag() {
  const webp = PLATE.sources.find((s) => s.type === 'image/webp') ?? PLATE.sources[0];
  if (!webp) return '';
  const href = webp.srcSet.split(',')[0].trim().split(/\s+/)[0];
  return (
    `<link rel="preload" as="image" type="${webp.type}" href="${href}"\n` +
    `      imagesrcset="${esc(webp.srcSet)}"\n` +
    `      imagesizes="${esc(webp.sizes)}" />`
  );
}

const PRELOAD = preloadTag();

function headFor(meta) {
  const url = meta.canonical ? `${ORIGIN}${meta.canonical === '/' ? '/' : meta.canonical}` : ORIGIN;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    meta.noindex ? '<meta name="robots" content="noindex">' : null,
    meta.canonical ? `<link rel="canonical" href="${url}">` : null,
    `<meta property="og:site_name" content="Gyanateet Dutta">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:image" content="${ORIGIN}${OG_IMAGE}">`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${ORIGIN}${OG_IMAGE}">`,
  ].filter(Boolean);
  return tags.map((t) => `    ${t}`).join('\n');
}

/** Replace the shell's placeholder head block and inject the rendered body. */
function pageFor(path, { html, meta }, { withPreload }) {
  let out = shell;

  const start = out.indexOf('<!--head-->');
  const end = out.indexOf('<!--/head-->');
  if (start === -1 || end === -1) {
    throw new Error('index.html is missing its <!--head--> ... <!--/head--> markers');
  }
  out = out.slice(0, start) + headFor(meta) + out.slice(end + '<!--/head-->'.length);

  // The plate is above the fold on the home page only. Preloading it on a
  // text-only case study cost 286 KB of an image that page never shows.
  out = out.replace('<!--preload-->', withPreload ? PRELOAD : '');

  return out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function write(relPath, contents) {
  const file = join(DIST, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

const routes = allRoutes();
for (const path of routes) {
  const rendered = render(path);
  const page = pageFor(path, rendered, { withPreload: path === '/' });
  write(path === '/' ? 'index.html' : `${path.slice(1)}.html`, page);
}

// /work needs to resolve whether or not Pages prefers the file to the
// directory that the case studies create alongside it.
write('work/index.html', readFileSync(join(DIST, 'work.html')));

// 404.html is rendered from an unknown route, not copied from the home page,
// so a genuinely missing URL no longer claims to be the home page.
write('404.html', pageFor('/__not-found__', render('/__not-found__'), { withPreload: false }));

// Sitemap lists canonical URLs only, so the /persona/gyanateet alias does not
// compete with /persona/yana for indexing.
const canonical = [...new Set(routes.map((p) => routeMeta(p).canonical).filter(Boolean))];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    canonical.map((p) => `  <url><loc>${ORIGIN}${p}</loc></url>`).join('\n') +
    `\n</urlset>\n`,
);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

if (existsSync(join(ROOT, 'dist-ssr'))) rmSync(join(ROOT, 'dist-ssr'), { recursive: true });

console.log(
  `prerendered ${routes.length} routes + 404.html, sitemap.xml (${canonical.length} URLs), robots.txt`,
);
