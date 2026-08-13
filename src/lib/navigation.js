import { PERSONA_BY_SLUG } from '../data/portfolio';

export function normalizePath(pathname) {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  if (path === '/') return { kind: 'home' };
  if (path === '/academic') return { kind: 'academic' };
  if (path === '/work') return { kind: 'work' };
  if (path.startsWith('/work/')) {
    const slug = path.split('/')[2] || '';
    return { kind: 'case-study', slug };
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
