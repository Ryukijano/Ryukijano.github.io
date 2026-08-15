/**
 * @material/material-color-utilities@0.4.0 ships ESM with extensionless relative
 * imports, which Node's ESM resolver rejects. This rewrites them in place inside
 * node_modules so the token generator can import the package.
 *
 * Only touched when regenerating tokens. The generated CSS is committed, so a
 * normal `npm ci && npm run build` never needs this.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'node_modules/@material/material-color-utilities';
let patched = 0;

const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      const src = readFileSync(p, 'utf8');
      const out = src.replace(
        /(from\s+['"])(\.\.?\/[^'"]*?)(['"])/g,
        (m, a, spec, z) => (/\.(js|json|mjs)$/.test(spec) ? m : `${a}${spec}.js${z}`),
      );
      if (out !== src) { writeFileSync(p, out); patched++; }
    }
  }
};

walk(root);
console.log(`patched ${patched} file(s) in ${root}`);
