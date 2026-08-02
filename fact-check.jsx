/*
 * Content integrity, not rendering. `npm run smoke` proves every route renders;
 * this proves the right things are IN it.
 *
 * Three classes of check, all of them enforcing rules the pages make about
 * themselves rather than anything about React:
 *
 *   MUST         every figure quoted in a case study still reaches the markup.
 *                A refactor that silently drops a table row or renames a
 *                content key will pass lint, build and smoke — and fail here.
 *   MUST_WORDS   the disclosure vocabulary. If a page says a figure is a
 *                schematic or illustrative rather than measured, losing that
 *                word is a factual regression, not a styling one.
 *   BANNED       misattribution, template leaks (undefined/NaN), the stub
 *                notice reappearing, and the pre-M3 hardcoded easing curve.
 *
 * Raw hex is counted too: a literal colour in the markup means something
 * escaped the token layer and will not retheme.
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import Intro from './src/pages/Intro.jsx';
import Academic from './src/pages/Academic.jsx';
import WorkIndex from './src/pages/WorkIndex.jsx';
import CaseStudyPage from './src/pages/CaseStudyPage.jsx';
import { caseStudies } from './src/content/caseStudies/index.js';

const tree = (
  <Routes>
    <Route path="/" element={<Intro />} />
    <Route path="/academic" element={<Academic />} />
    <Route path="/work" element={<WorkIndex />} />
    <Route path="/work/:slug" element={<CaseStudyPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const render = (r) => renderToString(<MemoryRouter initialEntries={[r]}>{tree}</MemoryRouter>);
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g, ' ').trim();

/*
 * Figures that must survive, per route.
 *
 * A bare string means "appears at least once". A [string, n] pair means
 * "appears exactly n times", and those are the ones that matter: a page
 * usually states a figure in a table AND again in the prose around it, so a
 * presence-only check passes even when one of the two has been altered. The
 * counts below were read off the rendered output once it had been verified
 * against the prototypes by hand. If one of them changes, that is not
 * necessarily a bug — but it is always something to look at.
 */
const MUST = {
  '/work/surgical-phase-detection': [
    ['21.8M', 4], ['303.9M', 4], ['90.0%', 2], ['89.5%', 2], ['25 ms', 2],
    ['12.5', 2], ['17.0', 1], ['0.099M', 3], ['0.57%', 2], ['64%', 1],
    'V-JEPA2', 'DINOv2',
    // two table cells plus the caption that explains them. If this drops to
    // one, someone has filled a pending figure in with a plausible number.
    ['tbc', 3],
  ],
  '/work/pothole-detection': [
    ['0.73 mAP@.5', 2], ['0.85 mAP@.5', 1], ['0.69 mAP@.5', 1],
    ['0.81 mAP@.5', 1], ['0.78 mAP@.5', 1], ['53 ms', 1], ['69 ms', 1],
    'arXiv:2401.08588', 'Nirmal Kumar Rout', 'Gopal Gupta',
  ],
  '/work/conditional-gqe': [
    ['0.63 mHa', 1], ['1.48 mHa', 1], ['87.5%', 1], ['11.3 mHa', 1], ['1.6 mHa', 1],
  ],
  '/work/nqcc-rolls-royce': [
    ['−2.18 eV', 1], ['−2.20 eV', 2], ['−2.15 eV', 2], ['0.9%', 1], ['2.8%', 1],
  ],
  '/work/fet-vae-surgical-prediction': [
    ['28.13 dB', 6], ['0.927', 3], ['0.062', 2], ['22 FPS', 4], ['+2.36 dB', 2],
  ],
  '/work/yquantum-shors-algorithm': ['N=15', '2048 shots', '143', '15 = 3 × 5'],
  '/work/dalton-mills': ['Grade II*', '2022', 'Alex Neish', 'Yuan Gao', 'Simon Popple'],
  '/work/gemma-le-vla': ['SigLIP', 'Gemma 3', 'ScaleDP'],
};

const countOf = (hay, needle) => hay.split(needle).length - 1;

// words that MUST appear (disclosure language)
const MUST_WORDS = {
  '/work/dalton-mills': ['schematic'],
  '/work/cosmos-sentinel': ['schematic'],
  '/work/syndrome-net': ['schematic'],
  '/work/got-jepa-tool-tracking': ['schematic'],
  '/work/pothole-detection': ['schematic'],
  '/work/nqcc-rolls-royce': ['illustrative'],
  '/work/gemma-le-vla': ['illustrative'],
  '/work/yquantum-shors-algorithm': ['schematic'],
};

const BANNED = ['pid/345/4093','undefined','NaN','[object Object]','not yet ported','NOT YET PORTED','cubic-bezier(.16,1,.3,1)'];
const CLICHE = ['revolutionary','cutting-edge','seamless','game-changing','at the intersection of','passionate about'];

const routes = ['/','/academic','/work', ...caseStudies.map(s=>`/work/${s.slug}`)];
let fail = 0, hexTotal = 0;
for (const r of routes) {
  const html = render(r);
  const t = text(html);
  const problems = [];
  for (const f of MUST[r] || []) {
    const [needle, want] = Array.isArray(f) ? f : [f, null];
    const n = countOf(t, needle);
    if (want === null) {
      if (n === 0) problems.push(`MISSING FIGURE ${JSON.stringify(needle)}`);
    } else if (n !== want) {
      problems.push(`FIGURE ${JSON.stringify(needle)} appears ${n}x, expected ${want}x`);
    }
  }
  for (const w of (MUST_WORDS[r] || [])) if (!t.toLowerCase().includes(w)) problems.push(`MISSING WORD ${JSON.stringify(w)}`);
  for (const b of BANNED) if (html.includes(b)) problems.push(`BANNED ${JSON.stringify(b)}`);
  for (const c of CLICHE) if (t.toLowerCase().includes(c)) problems.push(`CLICHE ${JSON.stringify(c)}`);
  const hex = [...html.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m=>m[0]);
  hexTotal += hex.length;
  if (hex.length) problems.push(`RAW HEX x${hex.length}: ${[...new Set(hex)].join(',')}`);
  if (problems.length) { fail++; console.log(`FAIL ${r}`); problems.forEach(p=>console.log(`     ${p}`)); }
  else console.log(`ok   ${r}`);
}
console.log(`\nraw hex in rendered markup, all routes: ${hexTotal}`);
console.log(fail ? `${fail} route(s) with problems` : 'all content checks pass');
process.exit(fail ? 1 : 0);
