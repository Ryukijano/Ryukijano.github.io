import { useSyncExternalStore } from 'react';

/**
 * Site-wide light/dark mode.
 *
 * One stored preference ("site-mode" in localStorage) wins over the system
 * setting; with nothing stored, `prefers-color-scheme` decides and live
 * system changes propagate. The value is read twice outside React: by the
 * inline pre-paint script in index.html (which stamps html[data-mode] before
 * first paint) and by Theme, which resolves every palette to its -light or
 * -dark token block. Both readers must agree with this module, so the storage
 * key lives here and nowhere else.
 */

const STORAGE_KEY = 'site-mode';
const MODES = new Set(['light', 'dark']);

let current = null;
const listeners = new Set();

function systemMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedMode() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return MODES.has(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function siteMode() {
  if (current === null) current = storedMode() ?? systemMode();
  return current;
}

export function setSiteMode(mode) {
  if (!MODES.has(mode) || mode === siteMode()) return;
  current = mode;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Private mode or full quota: the choice still holds for this visit.
  }
  listeners.forEach((listener) => listener(mode));
}

export function subscribeSiteMode(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React binding. Server snapshot is 'light'; the SPA never hydrates, so a
 * client-first dark value re-renders rather than mismatching markup. */
export function useSiteMode() {
  return useSyncExternalStore(subscribeSiteMode, siteMode, () => 'light');
}

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener?.('change', (event) => {
    if (storedMode()) return;
    current = event.matches ? 'dark' : 'light';
    document.documentElement.dataset.mode = current;
    listeners.forEach((listener) => listener(current));
  });
}
