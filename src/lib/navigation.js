import { PERSONA_BY_SLUG } from '../data/portfolio';

export function normalizePath(pathname) {
  if (!pathname) return '/';
  // GitHub Pages serves each prerendered file at <path> and <path>.html
  // alike. Both spellings must land on the same route — a slug that keeps
  // the suffix resolves to nothing and hydration swaps the page for the
  // 404, taking every figure with it.
  const trimmed = pathname
    .replace(/\/+$/, '')
    .replace(/\.html$/, '')
    .replace(/\/index$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  if (path === '/') return { kind: 'home' };
  if (path === '/academic') return { kind: 'academic' };
  if (path === '/work') return { kind: 'work' };
  if (path === '/tools') return { kind: 'tools' };
  if (path === '/figures') return { kind: 'figures' };
  if (path.startsWith('/work/')) {
    const slug = path.split('/')[2] || '';
    return { kind: 'case-study', slug };
  }
  if (path.startsWith('/notes/')) {
    const slug = path.split('/')[2] || '';
    return { kind: 'note', slug };
  }
  if (path.startsWith('/persona/')) {
    const slug = path.split('/')[2] || '';
    return { kind: 'persona', slug, persona: PERSONA_BY_SLUG[slug] ?? null };
  }
  return { kind: 'unknown' };
}

export function navigate(to) {
  const next = normalizePath(to);
  if (normalizePath(window.location.pathname) === next) return;
  window.history.pushState({}, '', next);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
