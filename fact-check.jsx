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
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Intro from './src/pages/Intro.jsx';
import Academic from './src/pages/Academic.jsx';
import WorkIndex from './src/pages/WorkIndex.jsx';
import CaseStudyPage from './src/pages/CaseStudyPage.jsx';
import Trust from './src/pages/Trust.jsx';
import PersonaPage from './src/pages/PersonaPage.jsx';
import BlogIndex from './src/pages/BlogIndex.jsx';
import BlogPage from './src/pages/BlogPage.jsx';
import NotFound from './src/pages/NotFound.jsx';
import { caseStudies } from './src/content/caseStudies/index.js';
import { notes } from './src/content/blog/index.js';

const tree = (
  <Routes>
    <Route path="/" element={<Intro />} />
    <Route path="/academic" element={<Academic />} />
    <Route path="/work" element={<WorkIndex />} />
    <Route path="/work/:slug" element={<CaseStudyPage />} />
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/blog/:slug" element={<BlogPage />} />
    <Route path="/trust" element={<Trust />} />
    <Route path="/persona/:id" element={<PersonaPage />} />
    <Route path="*" element={<NotFound />} />
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
  '/': [
    'I train vision models on surgical video under sparse labels and tight inference budgets.',
    'Parallel to that I write hybrid quantum–classical algorithms with Quantum Buddies.',
    'MSc Advanced Computer Science (Artificial Intelligence)',
  ],
  '/academic': [
    'MSc Advanced Computer Science (Artificial Intelligence)',
    '10.1109/isbi61048.2026.11515812',
    'AI in Medicine and Surgery',
    'I train vision models on surgical video under sparse labels and tight inference budgets.',
    'Parallel to that I write hybrid quantum–classical algorithms with Quantum Buddies.',
  ],
  /*
   * /trust is an index, not a case study: it re-sorts the same eleven projects
   * by how much of the output was recorded rather than supplied. Two things
   * hold that argument up.
   *
   * The band names, because the whole page is a claim about which of four
   * kinds of output you are looking at.
   *
   * The per-band project counts, because the page's own closing line reads
   * "eleven projects. five you could check, one you could check if you kept
   * the original, three you'd have to wait for, and two that nobody is ever
   * going to check" — 5 + 1 + 3 + 2 = 11. If a project quietly moved band the
   * page would still render and that sentence would be false, so the band
   * headings and the closing line are locked against each other: change one
   * without the other and this fails.
   *
   * Everything here is a presence check. The counts in the [string, n] pairs
   * elsewhere in this file were read off rendered output; this page did not
   * exist when these were written, so none of its multiplicities could be
   * verified and a guessed count would fail the build for the wrong reason.
   * Tighten these to pairs once the page renders — every figure below is
   * quoted once in card prose and several also appear in the band ramp.
   */
  /*
   * The band headings and the closing sentence state the same split twice —
   * 5 + 1 + 3 + 2 = 11 — in two different registers, and nothing in the page
   * makes them agree. Move one project between bands and a heading updates
   * while the sentence quietly becomes false. Both are locked at exactly one
   * occurrence, so a move fails on the heading and a rewrite fails on the
   * sentence.
   */
  '/trust': [
    ['5 projects', 1], ['1 project', 1], ['3 projects', 1], ['2 projects', 1],
    ['five you could check', 1],
    ['one you could check if you kept the original', 1],
    ['three you\u2019d have to wait for', 1],
    ['two that nobody is ever going to check', 1],
    // figures quoted in the card prose
    ['12.5', 1], ['17.0', 1],
    ['0.73', 1], ['0.85', 1], ['53 ms', 1], ['69 ms', 1],
    ['\u22122.15 eV', 1], ['\u22122.20 eV', 1],
    ['28.13 dB', 1], ['0.927', 1], ['0.062', 1],
    ['2048', 1], ['1.6 mHa', 1],
  ],
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
  '/blog': [
    'How the learning areas work',
    'Projects are domains, not the plot',
    'Pretraining is a different job from the label',
    'Skills are not SFT',
  ],
  '/blog/pretraining': ['pretext', 'Frozen', 'Continued pretraining', 'From scratch'],
  '/blog/contrastive-ssl': ['collapse', 'InfoNCE', 'Two views', 'self-distillation'],
  '/blog/predictive-ssl': ['latent', 'JEPA', 'we published JEPA', 'Three contracts'],
  '/blog/video-representation': ['temporal', 'bag of frames', 'Video is not a bag of frames'],
  '/blog/video-language': ['Vision-language-action', 'VLA', 'composed', 'USB arm'],
  '/blog/post-training': ['reward', 'SFT is cloning', 'RL is search', 'mental model, not a theorem', 'DPO', 'GRPO'],
  '/blog/diffusion-objectives': [
    'Denoising',
    'I have not trained a diffusion language model',
    'I have not trained LLaDA',
    'flow matching',
    'score matching',
  ],
  '/blog/agent-skills': ['Skills are not SFT', 'MCP', 'Ryukijano/agent-skills'],
  '/blog/qec-learning': ['syndrome', 'recovery', 'Error correction is a learning problem'],
  '/blog/qec-supervision': ['What the decoder is allowed to know', 'Supervised', 'Stim'],
  '/blog/circuit-search': ['Energy as a reward', 'N=15', '2048 shots', 'participant'],
};

const countOf = (hay, needle) => hay.split(needle).length - 1;

// words that MUST appear (disclosure language)
const MUST_WORDS = {
  '/': ['schematic', 'framing, not measured'],
  /* The four bands are this page's disclosure vocabulary: they are the words
   * that say how much of an output was recorded. Checked here rather than in
   * MUST because MUST_WORDS is case-insensitive, and the prototype sets them
   * in caps while the ids in src/content/trust.js are lower-case. */
  '/trust': ['measured', 'restored', 'inferred', 'invented'],
  '/work/dalton-mills': ['schematic'],
  '/work/cosmos-sentinel': ['schematic'],
  '/work/syndrome-net': ['schematic'],
  '/work/got-jepa-tool-tracking': ['schematic'],
  '/work/pothole-detection': ['schematic'],
  '/work/nqcc-rolls-royce': ['illustrative'],
  '/work/gemma-le-vla': ['illustrative'],
  '/work/yquantum-shors-algorithm': ['schematic'],
  '/blog': ['schematic'],
  '/blog/pretraining': ['schematic'],
  '/blog/contrastive-ssl': ['schematic', 'framing, not measured'],
  '/blog/predictive-ssl': ['schematic', 'framing, not measured'],
  '/blog/video-representation': ['schematic', 'framing, not measured'],
  '/blog/video-language': ['schematic'],
  '/blog/post-training': ['schematic', 'framing, not measured'],
  '/blog/diffusion-objectives': ['schematic', 'framing, not measured'],
  '/blog/qec-learning': ['schematic', 'framing, not measured'],
  '/blog/qec-supervision': ['schematic'],
  '/blog/circuit-search': ['schematic', 'framing, not measured'],
};

const BANNED = [
  'pid/345/4093','undefined','NaN','[object Object]','not yet ported','NOT YET PORTED',
  'cubic-bezier(.16,1,.3,1)',"Master's student in CS & AI",
  'I introduced V-JEPA', 'I published V-JEPA', 'I trained LLaDA', 'I introduced DINO',
];
const CLICHE = ['revolutionary','cutting-edge','seamless','game-changing','at the intersection of','passionate about'];

const routes = [
  '/', '/academic', '/work', '/blog', '/trust',
  ...notes.map((n) => `/blog/${n.slug}`),
  ...caseStudies.map(s=>`/work/${s.slug}`),
  '/persona/ryukijano', '/persona/gyanateet', '/persona/ryoushi',
];
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
  if (r === '/') {
    for (const b of ['esd-comparison.gif', 'doom_ppo.gif', 'ant_bullet.gif']) {
      if (html.includes(b)) problems.push(`BANNED ON HOME ${JSON.stringify(b)}`);
    }
  }
  const hex = [...html.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m=>m[0]);
  hexTotal += hex.length;
  if (hex.length) problems.push(`RAW HEX x${hex.length}: ${[...new Set(hex)].join(',')}`);
  if (problems.length) { fail++; console.log(`FAIL ${r}`); problems.forEach(p=>console.log(`     ${p}`)); }
  else console.log(`ok   ${r}`);
}
console.log(`\nraw hex in rendered markup, all routes: ${hexTotal}`);
console.log(fail ? `${fail} route(s) with problems` : 'all content checks pass');
process.exit(fail ? 1 : 0);
