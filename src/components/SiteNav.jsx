import { CV_URL } from '../data/portfolio';
import Link from '../lib/Link';
import { usePath } from '../lib/usePath';

const VARIANT = {
  ink: 'border-work-cream/15 bg-work-ink text-work-cream',
  paper: 'border-indigo-ink/15 bg-washi text-indigo-ink',
};

function navLinkClass(active) {
  return `font-sans text-[13px] underline-offset-4 hover:underline${active ? ' underline' : ''}`;
}

export default function SiteNav({ variant = 'ink', overlay = false }) {
  const path = usePath();
  const workActive = path === '/work' || path.startsWith('/work/');
  const academicActive = path === '/academic';
  const bar = variant === 'paper' ? VARIANT.paper : VARIANT.ink;
  const placement = overlay ? '' : 'sticky top-0';
  const wash = overlay && variant !== 'paper' ? 'bg-work-ink/80' : '';

  return (
    <nav aria-label="Site" className={`${placement} z-50 border-b ${bar} ${wash}`}>
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-[15px] tracking-normal">
          Gyanateet Dutta
        </Link>
        <div>
          <Link href="/work" aria-current={workActive ? 'page' : undefined} className={navLinkClass(workActive)}>
            Work
          </Link>
          <span aria-hidden="true"> · </span>
          <Link
            href="/academic"
            aria-current={academicActive ? 'page' : undefined}
            className={navLinkClass(academicActive)}
          >
            Academic
          </Link>
          <span aria-hidden="true"> · </span>
          <a href={CV_URL} className="font-sans text-[13px] underline-offset-4 hover:underline">
            CV
          </a>
        </div>
      </div>
    </nav>
  );
}
