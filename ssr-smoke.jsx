import { renderToString } from 'react-dom/server';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import Intro from './src/pages/Intro.jsx';
import Academic from './src/pages/Academic.jsx';
import WorkIndex from './src/pages/WorkIndex.jsx';
import CaseStudyPage from './src/pages/CaseStudyPage.jsx';

const tree = (
  <Routes>
    <Route path="/" element={<Intro />} />
    <Route path="/academic" element={<Academic />} />
    <Route path="/work" element={<WorkIndex />} />
    <Route path="/work/:slug" element={<CaseStudyPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const routes = ['/', '/academic', '/work', '/work/conditional-gqe', '/work/does-not-exist'];
let bad = 0;
for (const r of routes) {
  try {
    const html = renderToString(<MemoryRouter initialEntries={[r]}>{tree}</MemoryRouter>);
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const ok = text.length > 40 || r === '/work/does-not-exist';
    if (!ok) bad++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.padEnd(26)} ${String(text.length).padStart(6)} chars`);
    if (text.length) console.log(`        ${text.slice(0, 130)}…`);
  } catch (e) {
    bad++;
    console.log(`FAIL  ${r.padEnd(26)} threw: ${e.message.slice(0, 160)}`);
  }
}
console.log(bad ? `\n${bad} route(s) failed` : '\nall routes render');
process.exit(bad ? 1 : 0);
