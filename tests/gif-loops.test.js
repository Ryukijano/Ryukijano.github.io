/**
 * Every deployed GIF loops, and a method loop does not hold its first frame.
 *
 * Recorded and computed figures the stop-motion plan leaves alone may still
 * hold frame one. The new plates, and the Hopfield tour after its recut, may
 * not: frame one is the figure, and it stays under 300 ms.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GLITCH_WAVE } from '../src/data/marks.js';
import { allProjects, findProject, projectFigures } from '../src/data/portfolio.js';

const MEDIA = new URL('../public/assets/media/', import.meta.url).pathname;
const CAP_CS = 30;

/** First-frame holds the plan does not recut. */
const LONG_FIRST = new Set([
  'agentic-sfm.gif',
  'burgers-shock.gif',
  'dalton-mills.gif',
  'labs-barker.gif',
  'multiview-illustration.gif',
  'pothole-blink.gif',
  'surface-code-decode.gif',
]);

const PLATES = [
  'blackwell-cliff.gif',
  'quantumforge-spiral.gif',
  'b3tt3r-turntable.gif',
  'quantum-buddies-patch.gif',
  'glitch-wave.gif',
];

function parseGif(buf) {
  const sig = buf.subarray(0, 6).toString('ascii');
  let i = 13;
  if (buf[10] & 0x80) i += 3 * (1 << ((buf[10] & 7) + 1));
  const delays = [];
  let loop = null;
  while (i < buf.length) {
    const b = buf[i];
    if (b === 0x3b) break;
    if (b === 0x21 && buf[i + 1] === 0xff) {
      const size = buf[i + 2];
      const app = buf.subarray(i + 3, i + 3 + size).toString('ascii');
      let p = i + 3 + size;
      const blocks = [];
      while (buf[p] !== 0) {
        const n = buf[p];
        blocks.push(buf.subarray(p + 1, p + 1 + n));
        p += 1 + n;
      }
      if (app.startsWith('NETSCAPE')) loop = Buffer.concat(blocks).readUInt16LE(1);
      i = p + 1;
    } else if (b === 0x21 && buf[i + 1] === 0xf9) {
      delays.push(buf.readUInt16LE(i + 4));
      i += 8;
    } else if (b === 0x21) {
      i += 2;
      while (buf[i] !== 0) i += 1 + buf[i];
      i += 1;
    } else if (b === 0x2c) {
      i += 9;
      const ip = buf[i];
      i += 1;
      if (ip & 0x80) i += 3 * (1 << ((ip & 7) + 1));
      i += 1;
      while (buf[i] !== 0) i += 1 + buf[i];
      i += 1;
    } else i += 1;
  }
  return { sig, frames: delays.length, first: delays[0], loop };
}

describe('GIF loops', () => {
  const files = readdirSync(MEDIA).filter((name) => name.endsWith('.gif'));

  it('every GIF has more than one frame and an infinite loop', () => {
    const bad = [];
    for (const name of files) {
      const info = parseGif(readFileSync(join(MEDIA, name)));
      if (info.sig !== 'GIF89a' || info.frames < 2 || info.loop !== 0) {
        bad.push(`${name} sig=${info.sig} frames=${info.frames} loop=${info.loop}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('caps the first frame, except the figures the plan leaves held', () => {
    const held = [];
    for (const name of files) {
      const info = parseGif(readFileSync(join(MEDIA, name)));
      if (info.first > CAP_CS && !LONG_FIRST.has(name)) held.push(`${name} ${info.first * 10}ms`);
    }
    expect(held).toEqual([]);
  });

  it('ships the five new plates under the figure cap, with still posters', () => {
    for (const name of PLATES) {
      const gif = join(MEDIA, name);
      const poster = join(MEDIA, name.replace(/\.gif$/, '-poster.webp'));
      expect(statSync(gif).size, name).toBeLessThan(700_000);
      expect(statSync(poster).size, poster).toBeGreaterThan(0);
      const info = parseGif(readFileSync(gif));
      expect(info.first, name).toBeLessThanOrEqual(CAP_CS);
    }
  });

  it('places the cliff and the spiral after the sentences that earn them', () => {
    const blackwell = readFileSync(new URL('../src/content/cuda-blackwell-labs.md', import.meta.url), 'utf8');
    const forge = readFileSync(new URL('../src/content/quantumforge.md', import.meta.url), 'utf8');
    expect(blackwell.indexOf('<!-- figure 2 -->')).toBeGreaterThan(blackwell.indexOf('The 128 GB is not HBM'));
    expect(forge.indexOf('<!-- figure 2 -->')).toBeGreaterThan(forge.indexOf('That crossover is the honest summary'));
    const cliff = projectFigures(findProject('cuda-blackwell-labs'))[1];
    const spiral = projectFigures(findProject('quantumforge'))[1];
    expect(cliff.src).toBe('/assets/media/blackwell-cliff.gif');
    expect(cliff.scope).toMatch(/not a capture/i);
    expect(spiral.src).toBe('/assets/media/quantumforge-spiral.gif');
    expect(spiral.scope).toMatch(/not a capture/i);
    const turn = projectFigures(findProject('b3tt3r-3d-reconstruction'));
    expect(turn).toHaveLength(2);
    expect(turn[0].src).toMatch(/b3tt3r-illustration\.webp$/);
    expect(turn[1].scope).toMatch(/not a capture/i);
    const banner = projectFigures(findProject('quantum-buddies'))[0];
    expect(banner.scope).toMatch(/not a result/i);
    expect(GLITCH_WAVE.scope).toMatch(/not a result/i);
    expect(allProjects().some((p) => projectFigures(p).some((f) => f.src === GLITCH_WAVE.src))).toBe(false);
  });
});
