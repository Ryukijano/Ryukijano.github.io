// @vitest-environment node
/**
 * The desk-board links sit on paper, so the global seal ring is the
 * indicator. The washi-and-ink double rule belonged to lanes painted over
 * the Kanagawa plate; those lanes are gone, and this file now holds the
 * ring that replaced them.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

describe('focus ring', () => {
  it('is a 2px seal outline, offset from the element', () => {
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-seal\)/s);
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline-offset:\s*3px/s);
  });

  it('is not removed from the desk-board links', () => {
    const killed = css.match(/\.board[^{]*\{[^}]*outline:\s*none/g);
    expect(killed).toBeNull();
  });
});
