import { useEffect, useRef } from 'react';
import { DATA, findProject } from './data/portfolio';
import { resolveRoute } from './lib/navigation';
import { routeMeta } from './lib/routeMeta';
import { PathContext, usePath } from './lib/usePath';
import AcademicPage from './pages/AcademicPage';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import PersonaPage from './pages/PersonaPage';
import WorkPage from './pages/WorkPage';
import NotFoundPage from './pages/NotFoundPage';

function Page({ route }) {
  switch (route.kind) {
    case 'academic':
      return <AcademicPage />;
    case 'work':
      return <WorkPage />;
    case 'case-study':
      return <CaseStudyPage project={findProject(route.slug)} />;
    case 'persona':
      return DATA[route.persona] ? <PersonaPage data={DATA[route.persona]} /> : <NotFoundPage />;
    case 'home':
      return <HomePage />;
    default:
      return <NotFoundPage />;
  }
}

function Routed() {
  const path = usePath();
  const route = resolveRoute(path);

  useEffect(() => {
    // Browsers restore the previous offset on a history entry; we place the
    // reader ourselves so a client-side hop doesn't land mid-document.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    // Only on an actual navigation, never on first load. The tree remounts per
    // path, so without this the scroll position carries over from the previous
    // page and focus falls to <body> — a keyboard user activates a link and
    // hears nothing. #main carries tabIndex={-1} so it can receive focus.
    //
    // Skipping the first render matters: on load the reader is already at the
    // top, and stealing focus into #main would put the "Skip to content" link
    // behind the content it skips, out of reach of the first Tab.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [path]);

  // Set here rather than in each page, so the tab and the prerendered <head>
  // read from the same routeMeta().
  useEffect(() => {
    document.title = routeMeta(path).title;
  }, [path]);

  return <Page key={path} route={route} />;
}

/** `path` is supplied at build time by the prerender step; in the browser it
 *  is undefined and usePath reads window.location instead. */
export default function Portfolio({ path }) {
  return (
    <PathContext.Provider value={path ?? null}>
      <Routed />
    </PathContext.Provider>
  );
}
