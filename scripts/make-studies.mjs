/**
 * Draws the three Pinterest studies for the /figures gallery as flat SVGs.
 *
 * Each motif is redrawn from geometry, not traced from its pin: a spiral
 * tunnel, a set of wave lines, and a circuit tree. Strokes only (plus square
 * pads on the tree), square caps and joins, no blur, no copied pixels. Ink
 * and muted ink arrive as classes that the page maps to its own tokens, so the
 * studies print on both stocks; the files themselves name no colour.
 *
 * Run: node scripts/make-studies.mjs (writes media/study-*.svg)
 */
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const MEDIA = resolve(import.meta.dirname, '..', 'media');
const W = 640;
const H = 360;

const open = (label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">`;

// Compact numbers: the SVGs ship inlined in the JS bundle, so every byte
// counts against the 95 kB gzip budget. Integers on a 640x360 sheet.
const num = (v) => `${Math.round(v)}`;

/** An Archimedean spiral as a polyline, r growing from r0 to r1 over turns. */
function spiral(cx, cy, r0, r1, turns, steps = 150) {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = r0 + ((r1 - r0) * i) / steps;
    pts.push(`${num(cx + r * Math.cos(t))} ${num(cy + r * Math.sin(t))}`);
  }
  return `<polyline class="ink" points="${pts.join(' ')}"/>`;
}

/** Concentric rings whose gaps widen toward the rim, like a tunnel mouth. */
function tunnel(cx, cy, count = 9) {
  const rings = [];
  for (let i = 0; i < count; i += 1) {
    const r = 14 + i * i * 2.1 + i * 6;
    rings.push(`<circle class="ink" cx="${cx}" cy="${cy}" r="${num(r)}"/>`);
  }
  return rings.join('');
}

/** One sine line across the sheet. */
function wave(yBase, amp, waves, phase, cls = 'ink', steps = 55) {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * W;
    const y = yBase + amp * Math.sin((i / steps) * waves * 2 * Math.PI + phase);
    pts.push(`${num(x)} ${num(y)}`);
  }
  return `<polyline class="${cls}" points="${pts.join(' ')}"/>`;
}

// --- 1. the red spiral tunnel: rings in ink, one muted thread winding out ---
{
  const cx = W / 2;
  const cy = H / 2;
  const body = [
    tunnel(cx, cy),
    spiral(cx, cy, 8, 168, 3.25),
    // The muted thread: a shorter spiral over the ink one, offset half a turn.
    spiral(cx, cy, 10, 120, 2.5).replace('class="ink"', 'class="muted-stroke"'),
  ].join('');
  writeFileSync(
    join(MEDIA, 'study-spiral.svg'),
    `${open('A spiral tunnel of concentric rings with one thread winding out.')}` +
      `<g fill="none" stroke-width="2" stroke-linecap="square">${body}</g></svg>\n`,
  );
}

// --- 2. the blue wave lines: parallel sine runs, the middle one muted ---
{
  const lines = [];
  const count = 13;
  for (let i = 0; i < count; i += 1) {
    const yBase = 28 + (i * (H - 56)) / (count - 1);
    const amp = 10 + 14 * Math.sin((i / (count - 1)) * Math.PI);
    lines.push(wave(yBase, amp, 3, i * 0.45, i === 6 ? 'muted-stroke' : 'ink'));
  }
  writeFileSync(
    join(MEDIA, 'study-wave.svg'),
    `${open('Parallel wave lines running across the sheet, one picked out.')}` +
      `<g fill="none" stroke-width="2" stroke-linecap="square">${lines.join('')}</g></svg>\n`,
  );
}

// --- 3. the circuit tree: orthogonal traces from a root pad, square pads ---
{
  const traces = [];
  const pads = [];
  const pad = (x, y, cls = 'ink-fill') =>
    pads.push(`<rect class="${cls}" x="${num(x - 4)}" y="${num(y - 4)}" width="8" height="8"/>`);
  // (x0,y0) up the trunk to (x0,y1), then a horizontal branch to x1, up to y2.
  const branch = (x0, y0, y1, x1, y2, muted = false) => {
    traces.push(
      `<polyline class="ink" points="${num(x0)},${num(y0)} ${num(x0)},${num(y1)} ${num(x1)},${num(y1)} ${num(x1)},${num(y2)}"/>`,
    );
    pad(x1, y2, muted ? 'muted-fill' : 'ink-fill');
  };
  const rootX = W / 2;
  const rootY = H - 24;
  pad(rootX, rootY, 'muted-fill');
  // Three bifurcating tiers of orthogonal branches up the sheet.
  const levels = [268, 188, 116, 52];
  const spreads = [220, 120, 64];
  traces.push(`<polyline class="ink" points="${rootX},${rootY} ${rootX},${levels[0]}"/>`);
  let nodes = [{ x: rootX, y: levels[0] }];
  levels.slice(1).forEach((top, depth) => {
    const next = [];
    const spread = spreads[depth];
    nodes.forEach((node, i) => {
      [-1, 1].forEach((side) => {
        const ex = Math.min(600, Math.max(40, node.x + side * spread * (i % 2 ? 0.55 : 1)));
        const ey = top + (depth === levels.length - 2 ? (side < 0 ? 0 : 14) : 0);
        const muted = depth === levels.length - 2 && i === 1 && side > 0;
        branch(node.x, node.y, top, ex, ey, muted);
        next.push({ x: ex, y: ey });
      });
    });
    nodes = next;
  });
  writeFileSync(
    join(MEDIA, 'study-circuit-tree.svg'),
    `${open('A tree of circuit traces rising from one root pad to square ends.')}` +
      `<g fill="none" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">${traces.join('')}</g>` +
      `<g stroke="none">${pads.join('')}</g></svg>\n`,
  );
}

console.log('wrote media/study-spiral.svg, media/study-wave.svg, media/study-circuit-tree.svg');
