import Atmosphere from '../components/Atmosphere';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { TOOLS } from '../data/tools';
import Link from '../lib/Link';

export default function ToolsPage() {
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" tabIndex={-1} className="route print__body">
        <header>
          <p className="print__kicker">Workbench</p>
          <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
            Tools
          </h1>
          <p className="print__lede print__lede--muted">
            Things an agent on this site can clone and run. Each row names what it needs.
          </p>
        </header>

        <ul role="list">
          {TOOLS.map((tool) => (
            <li key={tool.name} className="tool">
              <div className="tool__name">
                <a href={tool.href} target="_blank" rel="noopener noreferrer">
                  {tool.name}
                </a>
              </div>
              <div className="tool__what">{tool.what}</div>
              <div className="tool__needs pi-label">
                <b>Needs</b>
                {tool.needs.map((need) => (
                  <span key={need}>{` · ${need}`}</span>
                ))}
              </div>
              <p className="tool__needs pi-label">{tool.scope}</p>
            </li>
          ))}
        </ul>

        <nav className="print__foot" aria-label="Other pages">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
