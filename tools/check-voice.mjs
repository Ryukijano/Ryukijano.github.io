/**
 * Voice guard for every content module: extends the anti-slop vocabulary that
 * `npm run notes` already enforces for field notes to personas, case studies,
 * and page content. Run: npm run voice
 *
 * Deliberately additive: this tool never replaces or weakens fact-check.jsx,
 * which owns factual claims by exact occurrence count. It only catches tone
 * regressions — the LinkedIn register the 7ec6f3b deslop pass removed.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/content', 'src/pages'];
/* Word-boundary where it matters: `\bjourney\b` must NOT fire on asset names
 * like gic2026_journey_loop.gif (underscores are word characters), and
 * `excited` must not fire on the physics term "excited-state". */
const BANNED = [
  ['passionate', /\bpassionate\b/i],
  ['journey', /\bjourney\b/i],
  ['thrilled', /\bthrilled\b/i],
  ['excited', /\bexcited\b(?!\s*-?\s*state)/i],
  ['cutting-edge', /\bcutting[- ]edge\b/i],
  ['seamless', /\bseamless(ly)?\b/i],
  ['game-changing', /\bgame[- ]chang(ing|er)\b/i],
  ['at the intersection of', /at the intersection of/i],
  ['state-of-the-art', /\bstate[- ]of[- ]the[- ]art\b/i],
  ['groundbreaking', /\bground[- ]breaking\b/i],
  ['revolutionary', /\brevolutionary\b/i],
  ['world-class', /\bworld[- ]class\b/i],
  ['next-level', /\bnext[- ]level\b/i],
  ['unleash', /\bunleash(es|ed|ing)?\b/i],
  ['empower', /\bempower(s|ed|ing)?\b/i],
  ['spearhead', /\bspearhead(s|ed|ing)?\b/i],
  ['delve', /\bdelv(e|es|ed|ing)\b/i],
  ['leverage', /\bleverag(e|es|ed|ing)\b/i],
  ['utilize', /\butiliz(e|es|ed|ing)\b/i],
  ['paradigm shift', /paradigm shift/i],
  ['deep dive', /deep dive/i],
];

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(?<![:'"])\/\/[^\n]*/g, ' ');
}

/*
 * Em-dash ceiling. The deslop pass of 2026-08-22 cut rendered prose from
 * ~235 dashes to under ten; the survivors are table-cell placeholders and
 * short structural labels, not sentence punctuation. The ceiling exists so a
 * future edit cannot quietly re-thicken the cadence — the tell is density,
 * and per-file is where it accumulates.
 */
const EM_DASH_CEILING = 4;

function jsFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    if (name.isDirectory()) out.push(...jsFiles(path));
    else if (/\.(js|jsx)$/.test(name.name)) out.push(path);
  }
  return out;
}

let fail = 0;
let files = 0;

for (const dir of DIRS) {
  for (const path of jsFiles(join(ROOT, dir))) {
    files += 1;
    let text;
    try {
      text = stripComments(readFileSync(path, 'utf8'));
    } catch {
      continue;
    }
    for (const [label, re] of BANNED) {
      if (re.test(text)) {
        fail += 1;
        console.log(`FAIL  ${path.slice(ROOT.length + 1)}  banned voice: ${label}`);
      }
    }
    const dashes = (text.match(/—/g) || []).length;
    if (dashes > EM_DASH_CEILING) {
      fail += 1;
      console.log(
        `FAIL  ${path.slice(ROOT.length + 1)}  em-dash density: ${dashes} > ${EM_DASH_CEILING}`,
      );
    }
  }
}

console.log(fail ? `${fail} voice check(s) failed` : `ok   ${files} content files`);
process.exit(fail ? 1 : 0);
