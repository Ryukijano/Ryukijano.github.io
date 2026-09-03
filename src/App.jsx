import { DATA, findProject } from './data/portfolio';
import { resolveRoute } from './lib/navigation';
import { usePath } from './lib/usePath';
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
    <div className="print print--ink">
      <Atmosphere variant="quiet" />
      <SiteNav variant="ink" />
      <main className="print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title">This path isn&apos;t on the site.</h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/">Personal</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
        </nav>
      </main>
    </div>
  );
}

export default function Portfolio() {
  const path = usePath();
  const route = resolveRoute(path);

  switch (route.kind) {
    case 'academic':
      return <AcademicPage />;
    case 'work':
      return <WorkPage />;
    case 'case-study': {
      const project = findProject(route.slug);
      return <CaseStudyPage project={project} />;
    }
    case 'persona':
      return DATA[route.persona] ? <PersonaPage data={DATA[route.persona]} /> : <NotFoundPage />;
    case 'home':
      return <HomePage />;
    case 'unknown':
      return <NotFoundPage />;
    default: {
      const _exhaustive = route.kind;
      return <NotFoundPage />;
    }
  }
}
