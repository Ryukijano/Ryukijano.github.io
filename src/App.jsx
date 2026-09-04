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
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" className="print__body print__body--narrow">
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

export default function Portfolio() {
  const path = usePath();
  const route = resolveRoute(path);

  return (
    <div key={path} className="route">
      <Page route={route} />
    </div>
  );
}
