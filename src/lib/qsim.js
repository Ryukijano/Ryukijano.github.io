/* Moved verbatim out of the `<script type="text/x-dc">` block in
   "Case Study - Conditional GQE.dc.html" — the section between the
   "a real 4-qubit statevector simulator" comment and `class Component`.
   Nothing below this header has been edited; the only addition is the
   `export { ... }` statement at the bottom of the file. */

/* ── a real 4-qubit statevector simulator ───────────────────────────────────
   Not a mock-up. Everything the panel reports is computed here, in the page.
   The Hamiltonian below is a toy: the coefficients are chosen, not taken from
   any molecule. Its only relevant property is that its ground state is
   entangled, so diagonal operators provably cannot reach it.                */
const NQ = 4, DIM = 16;
const HAM = [
  [0.60, 'ZZII'], [0.60, 'IIZZ'], [0.20, 'IZZI'],
  [0.35, 'XXII'], [0.18, 'YYII'],
  [0.35, 'IIXX'], [0.18, 'IIYY'],
  [0.25, 'XXXX'],
];
const E_REF    = 1.0;          // <1100|H|1100>, verified
const E_GROUND = -2.028703;    // smallest eigenvalue of H, verified

const OPS_DIAGONAL   = ['ZZII', 'IZIZ', 'ZIZI', 'IIZZ'];
const OPS_ENTANGLING = ['XYII', 'YXII', 'XYXX', 'XZZY'];
const PALETTE = OPS_DIAGONAL.concat(OPS_ENTANGLING);
const isDiagonal = (p) => p.indexOf('X') < 0 && p.indexOf('Y') < 0;

const qbit  = (i, q) => (i >> (NQ - 1 - q)) & 1;
const qflip = (i, q) => i ^ (1 << (NQ - 1 - q));

function applyPauli(re, im, P) {
  const nr = new Float64Array(DIM), ni = new Float64Array(DIM);
  for (let i = 0; i < DIM; i++) {
    if (re[i] === 0 && im[i] === 0) continue;
    let j = i, cr = 1, ci = 0;
    for (let q = 0; q < NQ; q++) {
      const p = P[q];
      if (p === 'I') continue;
      if (p === 'X') { j = qflip(j, q); }
      else if (p === 'Z') { if (qbit(j, q) === 1) { cr = -cr; ci = -ci; } }
      else if (p === 'Y') {
        const b = qbit(j, q); j = qflip(j, q);
        const s = (b === 0) ? 1 : -1;
        const tr = -s * ci, ti = s * cr; cr = tr; ci = ti;
      }
    }
    nr[j] += cr * re[i] - ci * im[i];
    ni[j] += cr * im[i] + ci * re[i];
  }
  return [nr, ni];
}

/* exp(-i θ P / 2) = cos(θ/2)·I − i·sin(θ/2)·P, since P² = I */
function applyRot(re, im, P, theta) {
  const c = Math.cos(theta / 2), s = Math.sin(theta / 2);
  const [pr, pi] = applyPauli(re, im, P);
  const nr = new Float64Array(DIM), ni = new Float64Array(DIM);
  for (let i = 0; i < DIM; i++) { nr[i] = c * re[i] + s * pi[i]; ni[i] = c * im[i] - s * pr[i]; }
  return [nr, ni];
}

function energyOf(ops, th) {
  let re = new Float64Array(DIM), im = new Float64Array(DIM);
  re[0b1100] = 1;                                   // the reference state |1100>
  for (let k = 0; k < ops.length; k++) [re, im] = applyRot(re, im, ops[k], th[k]);
  let E = 0;
  for (let t = 0; t < HAM.length; t++) {
    const [pr, pi] = applyPauli(re, im, HAM[t][1]);
    let acc = 0;
    for (let i = 0; i < DIM; i++) acc += re[i] * pr[i] + im[i] * pi[i];
    E += HAM[t][0] * acc;
  }
  return E;
}

function gradOf(ops, th) {
  const h = 1e-5, g = [];
  for (let k = 0; k < ops.length; k++) {
    const a = th.slice(), b = th.slice();
    a[k] += h; b[k] -= h;
    g.push((energyOf(ops, a) - energyOf(ops, b)) / (2 * h));
  }
  return g;
}

export {
  NQ,
  DIM,
  HAM,
  E_REF,
  E_GROUND,
  OPS_DIAGONAL,
  OPS_ENTANGLING,
  PALETTE,
  isDiagonal,
  applyPauli,
  applyRot,
  energyOf,
  gradOf,
};
