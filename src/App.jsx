import { useEffect, useRef } from 'react';
import { DATA, findProject } from './data/portfolio';
import { resolveRoute } from './lib/navigation';
import { routeMeta } from './lib/routeMeta';
import { PathContext, usePath } from './lib/usePath';
import Link from './lib/Link';
import AcademicPage from './pages/AcademicPage';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import PersonaPage from './pages/PersonaPage';
import WorkPage from './pages/WorkPage';
import SiteNav from './components/SiteNav';
import Atmosphere from './components/Atmosphere';

function NotFoundPage() {
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
          This path isn&apos;t on the site.
        </h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
        </nav>
      </main>
    </div>
  );
}

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
