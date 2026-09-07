import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { PLATE } from './data/plate.js';
import {
  allRoutes,
  routeMeta,
  ORIGIN,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_NAME,
} from './lib/routeMeta.js';

/**
 * Build-time entry. `scripts/prerender.mjs` calls render() once per route.
 *
 * This goes through Vite's SSR build rather than plain Node: the modules under
 * src/ use extensionless imports and JSX, neither of which bare Node ESM can
 * resolve. Plain createElement here so the file needs no JSX transform of its
 * own and stays out of fast refresh.
 */
export function render(path) {
  return {
    html: renderToString(createElement(App, { path })),
    meta: routeMeta(path),
  };
}

export { allRoutes, routeMeta, PLATE, ORIGIN, OG_IMAGE, OG_IMAGE_ALT, SITE_NAME };
