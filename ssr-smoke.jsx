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

/*
 * Every case study, not a representative one. A body component that throws
 * only on its own route is exactly the failure this is here to catch, and
 * eleven renders cost about a second.
 */
const missing = new Set(['/work/does-not-exist', '/nope']);
const routes = [
  '/',
  '/academic',
  '/work',
  '/blog',
  ...notes.map((n) => `/blog/${n.slug}`),
  '/trust',
  ...caseStudies.map((s) => `/work/${s.slug}`),
  '/persona/ryukijano',
  '/persona/gyanateet',
  '/persona/ryoushi',
  '/work/does-not-exist',
  '/nope',
];
let bad = 0;
for (const r of routes) {
  try {
    const html = renderToString(<MemoryRouter initialEntries={[r]}>{tree}</MemoryRouter>);
    const text = html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;|&#39;|&apos;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    const onSite = /isn't on the site/i.test(text);
    const ok = missing.has(r) ? onSite && text.length > 40 : text.length > 40;
    if (!ok) bad++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.padEnd(34)} ${String(text.length).padStart(6)} chars`);
    if (text.length) console.log(`        ${text.slice(0, 130)}…`);
  } catch (e) {
    bad++;
    console.log(`FAIL  ${r.padEnd(34)} threw: ${e.message.slice(0, 160)}`);
  }
}
console.log(bad ? `\n${bad} route(s) failed` : '\nall routes render');
process.exit(bad ? 1 : 0);
