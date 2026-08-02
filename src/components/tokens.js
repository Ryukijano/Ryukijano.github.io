/**
 * Design tokens, read out of the .dc.html prototypes.
 *
 * Three palettes are actually in use and they are not interchangeable:
 *  - `light`  — the case-study pages (paper ground, terracotta accent)
 *  - `dark`   — the index / academic pages (near-black ground, warmer accent)
 *  - `intro`  — the triptych landing page, which runs its own darker ground
 *               and three persona accents
 */

/* Case studies — "Case Study - Conditional GQE.dc.html" and siblings. */
export const light = {
  paper: '#faf9f5',
  ink: '#141413',
  body: '#5e5d59',
  muted: '#8a847a',
  rule: '#d8d3c8',
  faint: '#e6e2d8',
  field: '#f0eee5',
  terracotta: '#c96442',
  slate: '#6f9fd8',
  // the slash between the two breadcrumb halves, and the upper dashed line
  divider: '#c9c4b8',
  // the panel well behind the energy trace
  well: '#f7f5ef',
};

/* Index / academic — "Academic.dc.html". */
export const dark = {
  bg: '#161618',
  card: '#1f1f22',
  cardHover: '#26262a',
  text: '#dcd8d0',
  muted: '#8b867e',
  dim: '#5f5b55',
  hairline: 'rgba(220,216,208,0.09)',
  accent: '#d1764f',
  slate: '#6f9fd8',
};

/* Landing triptych — "Intro.dc.html". */
export const intro = {
  ground: '#090908',
  paper: '#eae6dc',
  muted: '#8a847a',
  dimmed: '#5c574f',
  ryukijano: '#6f9fd8',
  gyanateet: '#d6a05c',
  ryoushi: '#c25b83',
  hairline: 'rgba(234,230,220,0.12)',
};

/* Work index — "Revamp E - Method Transfer.dc.html". */
export const workIndex = {
  ground: '#0b0d10',
  paper: '#eae6dc',
  accents: ['#6f9fd8', '#c96442', '#b04a75', '#6fae9a'],
  columns: ['GRAPHICS', 'VISION', 'QUANTUM', 'SCIENCES'],
  hairline: 'rgba(234,230,220,0.10)',
};

export const fonts = {
  serif: "'Iowan Old Style','Tiempos Headline',Georgia,serif",
  serifShort: "'Iowan Old Style',Georgia,serif",
  display: "'Fraunces','Iowan Old Style',Georgia,serif",
  body: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
  mono: "'JetBrains Mono',monospace",
  pixel: "'Silkscreen',monospace",
};

/**
 * The repeated per-element style strings from the case-study `renderVals()`.
 * Kept as strings so they can be concatenated and passed through parseStyle().
 */
export const cs = {
  numStyle: `font-family:${fonts.mono};font-size:13px;color:${light.terracotta};letter-spacing:0.1em;margin:0`,
  kickerStyle: `font-family:${fonts.mono};font-size:11px;color:${light.muted};letter-spacing:0.1em;margin:8px 0 0`,
  h2Style: `font-family:${fonts.serif};font-weight:500;font-size:29px;letter-spacing:-0.012em;margin:0 0 16px;line-height:1.2`,
  bodyStyle: `font-size:15.5px;line-height:1.65;color:${light.body};max-width:64ch;margin:0`,
  bodyStyleSpaced: `font-size:15.5px;line-height:1.65;color:${light.body};max-width:64ch;margin:18px 0 0`,
  bodyStyleTop: `font-size:15.5px;line-height:1.65;color:${light.body};max-width:64ch;margin:40px 0 0`,
  caption: `font-family:${fonts.mono};font-size:10.5px;color:${light.muted};margin:12px 0 0;line-height:1.6`,
  captionTight: `font-family:${fonts.mono};font-size:10.5px;color:${light.muted};margin:11px 0 0;line-height:1.6`,
  figureFrame: `border:1px solid ${light.rule};border-radius:10px;overflow:hidden;background:${light.paper}`,
  tableCell: `font-family:${fonts.mono};font-size:11.5px;padding:13px 14px;color:${light.body};border-left:1px solid ${light.faint};line-height:1.5`,
};

export default { light, dark, intro, workIndex, fonts, cs };
