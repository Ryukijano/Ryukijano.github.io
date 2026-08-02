import { useEffect, useState } from 'react';
import { parseStyle } from '../lib/style.js';
import { fonts, light } from './tokens.js';
import {
  E_GROUND,
  E_REF,
  OPS_DIAGONAL,
  OPS_ENTANGLING,
  PALETTE,
  energyOf,
  gradOf,
  isDiagonal,
} from '../lib/qsim.js';

const ACCENT = light.terracotta; // #c96442
const SLATE = light.slate; // #6f9fd8

const START_ANGLES = [0.15, 0.15, 0.15, 0.15];
const STEPS_PER_FRAME = 3;
const LEARNING_RATE = 0.25;
const MAX_STEPS = 360;
const TRACE_LENGTH = 72;

/* The plotted window: the reference line sits near the top, the ground state
   near the bottom, so a descent fills the box. */
const TOP = 1.25;
const BOT = -2.15;
const toY = (v) => Math.max(0, Math.min(1, (TOP - v) / (TOP - BOT)));

/**
 * The interactive panel. Every number it prints comes out of src/lib/qsim.js —
 * the energy, the finite-difference gradient, the trace. Nothing is scripted.
 *
 * The optimiser state lives in useState and advances through a PURE updater.
 * That matters: React 19 StrictMode double-invokes updaters in development to
 * catch impure ones. `advance` never mutates its argument — it copies the angle
 * array before descending — so running it twice yields the same model and the
 * numbers this page argues about stay honest.
 */
/**
 * One frame of gradient descent. Pure: copies the angle array instead of
 * mutating it, so StrictMode may call this twice with no change in outcome.
 */
function advance(m) {
  if (m.steps >= MAX_STEPS) return m;
  const th = m.th.slice();
  for (let n = 0; n < STEPS_PER_FRAME; n++) {
    const g = gradOf(m.ops, th);
    for (let k = 0; k < th.length; k++) th[k] -= LEARNING_RATE * g[k];
  }
  return {
    ops: m.ops,
    th,
    trace: m.trace.concat([energyOf(m.ops, th)]).slice(-TRACE_LENGTH),
    steps: m.steps + STEPS_PER_FRAME,
  };
}

export default function CircuitLab() {
  const [model, setModel] = useState(() => ({
    ops: OPS_DIAGONAL.slice(),
    th: START_ANGLES.slice(),
    trace: [],
    steps: 0,
  }));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    let cancelled = false;
    let raf = 0;

    let framesLeft = Math.ceil(MAX_STEPS / STEPS_PER_FRAME);

    const pump = () => {
      if (cancelled) return;
      setModel(advance);
      framesLeft -= 1;
      if (framesLeft <= 0) {
        setRunning(false);
        return;
      }
      raf = requestAnimationFrame(pump);
    };

    raf = requestAnimationFrame(pump);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [running]);

  const load = (ops) => {
    setModel({ ops: ops.slice(), th: START_ANGLES.slice(), trace: [], steps: 0 });
    setRunning(false);
  };

  const cycleOp = (i) => {
    setRunning(false);
    setModel((m) => {
      const next = m.ops.slice();
      next[i] = PALETTE[(PALETTE.indexOf(next[i]) + 1) % PALETTE.length];
      return { ops: next, th: START_ANGLES.slice(), trace: [], steps: 0 };
    });
  };

  const reset = () => {
    setRunning(false);
    setModel((m) => ({ ops: m.ops, th: START_ANGLES.slice(), trace: [], steps: 0 }));
  };

  const { ops, th, trace, steps } = model;
  const E = energyOf(ops, th);
  const g = gradOf(ops, th);
  const gmax = Math.max.apply(null, g.map(Math.abs));
  const allDiag = ops.every(isDiagonal);
  const nEnt = ops.filter((p) => !isDiagonal(p)).length;

  const verdict = allDiag
    ? 'Every operator here is diagonal. The energy is not stuck because the optimiser is weak — it is stuck because the gradient is exactly zero, for any angle, for any Hamiltonian. Nothing to descend.'
    : nEnt === ops.length
      ? 'All four operators genuinely interact. The gradient is real and the energy falls away from the reference.'
      : `${nEnt} of 4 operators interact. One is enough to unstick it, though a mostly-diagonal circuit descends slowly.`;

  const delta = `${E - E_REF >= 0 ? '+' : ''}${(E - E_REF).toFixed(6)}`;

  return (
    <div
      style={parseStyle(
        `margin:30px 0 0;border:1px solid ${light.rule};border-radius:12px;background:${light.paper};padding:22px`,
      )}
    >
      <p style={parseStyle(statLabel)}>THE CIRCUIT — CLICK TO CHANGE AN OPERATOR</p>
      <div style={parseStyle('display:flex;gap:10px;margin:0 0 22px')}>
        {ops.map((p, i) => {
          const d = isDiagonal(p);
          const col = d ? ACCENT : SLATE;
          const gv = Math.min(1, Math.abs(g[i]) / 0.35);
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => cycleOp(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  cycleOp(i);
                }
              }}
              style={parseStyle(
                `flex:1;min-width:0;cursor:pointer;border:1px solid ${col};border-radius:7px;` +
                  `padding:11px 10px;background:${d ? 'rgba(201,100,66,0.05)' : 'rgba(111,159,216,0.06)'};` +
                  `transition:background .2s;user-select:none`,
              )}
            >
              <span
                style={parseStyle(
                  `font-family:${fonts.mono};font-size:15px;letter-spacing:0.09em;color:${col};display:block`,
                )}
              >
                {p}
              </span>
              <span
                style={parseStyle(
                  `font-family:${fonts.mono};font-size:8.5px;letter-spacing:0.1em;color:${light.muted};display:block;margin-top:4px`,
                )}
              >
                {d ? 'diagonal' : 'entangling'}
              </span>
              <span
                style={parseStyle(
                  `font-family:${fonts.mono};font-size:9.5px;color:${light.muted};display:block;margin-top:7px`,
                )}
              >
                {`θ ${th[i].toFixed(3)}`}
              </span>
              <div
                style={parseStyle(
                  `height:5px;border:1px solid ${light.faint};border-radius:3px;margin-top:7px;overflow:hidden`,
                )}
              >
                <div
                  style={parseStyle(
                    `height:100%;width:${(gv * 100).toFixed(1)}%;background:${col};transition:width .12s linear`,
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={parseStyle(
          'display:flex;gap:26px;flex-wrap:wrap;align-items:flex-end;margin:0 0 18px',
        )}
      >
        <Stat label="ENERGY">
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:26px;color:${allDiag ? ACCENT : SLATE};margin:0`,
            )}
          >
            {E.toFixed(6)}
          </p>
        </Stat>
        <Stat label="VS REFERENCE">
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:13px;color:${light.body};margin:0`,
            )}
          >
            {delta}
          </p>
        </Stat>
        <Stat label="LARGEST GRADIENT">
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:13px;color:${gmax < 1e-9 ? ACCENT : SLATE};margin:0`,
            )}
          >
            {gmax < 1e-9 ? 'exactly zero' : gmax.toFixed(6)}
          </p>
        </Stat>
        <Stat label="DESCENT">
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:13px;color:${light.body};margin:0`,
            )}
          >
            {`${steps} steps`}
          </p>
        </Stat>
      </div>

      <div
        style={parseStyle(
          `position:relative;height:132px;border:1px solid ${light.faint};border-radius:8px;background:${light.well};overflow:hidden`,
        )}
      >
        <div
          style={parseStyle(
            `position:absolute;left:0;right:0;top:${(toY(E_REF) * 100).toFixed(2)}%;border-top:1px dashed ${light.divider};pointer-events:none`,
          )}
        />
        <div
          style={parseStyle(
            `position:absolute;left:0;right:0;top:${(toY(E_GROUND) * 100).toFixed(2)}%;border-top:1px dashed rgba(111,159,216,0.55);pointer-events:none`,
          )}
        />
        <div
          style={parseStyle(
            'position:absolute;inset:0;display:flex;align-items:flex-end;gap:1px;padding:0 6px',
          )}
        >
          {trace.map((v, i) => (
            <div
              key={i}
              style={parseStyle(
                `flex:1;min-width:1px;align-self:flex-end;height:${((1 - toY(v)) * 100).toFixed(2)}%;` +
                  `background:${allDiag ? ACCENT : SLATE};opacity:0.8`,
              )}
            />
          ))}
        </div>
      </div>
      <div style={parseStyle('display:flex;justify-content:space-between;margin:7px 0 0')}>
        <span
          style={parseStyle(
            `font-family:${fonts.mono};font-size:9px;color:${light.muted}`,
          )}
        >
          dashed upper — where you start · dashed lower — the best this Hamiltonian
          allows
        </span>
      </div>

      <div style={parseStyle('display:flex;gap:9px;flex-wrap:wrap;margin:20px 0 0')}>
        <button type="button" onClick={() => setRunning((r) => !r)} style={parseStyle(btnStyle)}>
          {running ? 'stop' : steps > 0 ? 'keep going' : 'optimise the angles'}
        </button>
        <button type="button" onClick={reset} style={parseStyle(btnGhost)}>
          reset angles
        </button>
        <button type="button" onClick={() => load(OPS_DIAGONAL)} style={parseStyle(btnGhost)}>
          load all-diagonal
        </button>
        <button type="button" onClick={() => load(OPS_ENTANGLING)} style={parseStyle(btnGhost)}>
          load entangling
        </button>
      </div>

      <p
        style={parseStyle(
          `font-size:14px;line-height:1.6;color:${light.body};margin:18px 0 0;max-width:66ch`,
        )}
      >
        {verdict}
      </p>
    </div>
  );
}

function Stat({ label, children }) {
  return (
    <div>
      <p style={parseStyle(statLabel)}>{label}</p>
      {children}
    </div>
  );
}

const statLabel = `font-family:${fonts.mono};font-size:9px;letter-spacing:0.12em;color:${light.muted};margin:0 0 5px`;

const btnStyle =
  `font-family:${fonts.mono};font-size:11px;letter-spacing:0.08em;padding:9px 16px;` +
  `border:1px solid ${ACCENT};border-radius:6px;background:${ACCENT};color:${light.paper};cursor:pointer`;

const btnGhost =
  `font-family:${fonts.mono};font-size:11px;letter-spacing:0.08em;padding:9px 16px;` +
  `border:1px solid ${light.rule};border-radius:6px;background:transparent;color:${light.body};cursor:pointer`;
