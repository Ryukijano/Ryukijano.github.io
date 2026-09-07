/**
 * Fails the build on bloat, and on anything shipping that nothing references.
 *
 * The second check is the one that matters: dist/ was 59.7 MB against 3.6 MB
 * of referenced assets, because Vite copies public/ verbatim and the
 * pre-React site was still sitting in it. Unreferenced files now live in
 * media/, and this is what keeps that boundary from quietly eroding.
 *
 * Budgets are on gzip, not raw, because gzip is what crosses the wire.
 */
import { gzipSync } from 'node:zlib';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');

const BUDGETS = {
  js: 95_000, // gzip. 72.6 KB today, and React itself is ~45 KB of that.
  css: 10_000, // gzip. 5.6 KB today.
  singleAsset: 2_000_000, // no single deployed file over 2 MB
};

/** Files that are meant to be there without any page linking them. */
const ALLOWED_UNREFERENCED = new Set([
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'index.html',
]);

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const failures = [];
const gz = (f) => gzipSync(readFileSync(f), { level: 9 }).length;
const kb = (n) => `${(n / 1000).toFixed(1)} kB`;

// --- bundle budgets ---
for (const [ext, budget] of [['js', BUDGETS.js], ['css', BUDGETS.css]]) {
  const bundles = files.filter((f) => f.endsWith(`.${ext}`));
  const total = bundles.reduce((sum, f) => sum + gz(f), 0);
  const label = `${ext.toUpperCase()} ${kb(total)} gzip`;
  if (total > budget) failures.push(`${label} exceeds ${kb(budget)}`);
  else console.log(`  ok   ${label} (budget ${kb(budget)})`);
}

// --- no single huge asset ---
for (const f of files) {
  const size = statSync(f).size;
  if (size > BUDGETS.singleAsset) {
    failures.push(`${relative(DIST, f)} is ${kb(size)}, over the ${kb(BUDGETS.singleAsset)} cap`);
  }
}

// --- nothing unreferenced ---
// References are followed transitively: HTML names the stylesheet, and the
// stylesheet names the fonts. Scanning only HTML would flag every self-hosted
// woff2 as an orphan.
const referenced = new Set();

const collect = (text) => {
  for (const m of text.matchAll(/(?:src|href|content)="([^"]+)"/g)) {
    if (m[1].startsWith('/')) referenced.add(m[1].slice(1));
    else if (m[1].includes('ryukijano.github.io/')) {
      referenced.add(m[1].split('ryukijano.github.io/')[1]);
    }
  }
  // srcset candidates, and url() in CSS
  for (const m of text.matchAll(/(\/[^\s",)]+\.(?:webp|avif|jpe?g|png))\s+\d+w/g)) {
    referenced.add(m[1].slice(1));
  }
  for (const m of text.matchAll(/url\(\s*['"]?(\/[^'")]+)['"]?\s*\)/g)) {
    referenced.add(m[1].slice(1));
  }
};

for (const f of files) {
  if (f.endsWith('.html') || f.endsWith('.css')) collect(readFileSync(f, 'utf8'));
}

const orphans = files
  .map((f) => relative(DIST, f))
  .filter((r) => !referenced.has(r) && !ALLOWED_UNREFERENCED.has(r))
  // every prerendered route file is reachable by URL, not by a link from
  // another page, so treat the manifest's own output as referenced
  .filter((r) => !r.endsWith('.html'));

if (orphans.length) {
  failures.push(
    `${orphans.length} unreferenced file(s) in dist/ — move them to media/ or link them:\n` +
      orphans.map((r) => `        ${r} (${kb(statSync(join(DIST, r)).size)})`).join('\n'),
  );
} else {
  console.log(`  ok   every one of ${files.length} deployed files is referenced or a route`);
}

const total = files.reduce((s, f) => s + statSync(f).size, 0);
console.log(`  ok   dist/ is ${(total / 1e6).toFixed(1)} MB across ${files.length} files`);

if (failures.length) {
  console.error('\nbudget check failed:\n' + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
