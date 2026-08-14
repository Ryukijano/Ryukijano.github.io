import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import PullQuote from '../components/PullQuote.jsx';
import MediaFigure, { Caption } from '../components/MediaFigure.jsx';
import KanagawaField from '../components/KanagawaField.jsx';
import content from '../content/intro.js';

const SERIF = '--m3-font:var(--md-sys-typescale-brand-font)';
const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';

const COL_TO_CLIP = ['graphics', 'vision', 'quantum', 'sciences'];
const BAND_TO_CLIP = {
  measured: 'quantum',
  restored: 'restored',
  inferred: 'vision',
  invented: 'graphics',
};

const linkStyle = parseStyle(
  'color:var(--md-sys-color-primary);text-decoration:none;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
);

const HAIRLINE = '1px solid var(--md-sys-color-outline-variant)';

/** / — Distill article. The triptych is gone; Figure 1 is the woodblock. */
export default function Intro() {
  const [row, setRow] = useState(content.fig2.defaultRow);
  const [col, setCol] = useState(null);
  const [band, setBand] = useState(null);

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  const clipKey = band ? BAND_TO_CLIP[band] : col === null ? null : COL_TO_CLIP[col];
  const clip = clipKey ? content.clips[clipKey] : null;
  const fieldMode = clip ? clip.mode : null;
  const rowNote = content.matrixRows[row]?.note;

  const lock = (nextRow, nextCol, nextBand = null) => {
    setRow(nextRow);
    setCol(nextCol);
    setBand(nextBand);
  };

  return (
    <Theme
      name="study"
      style={parseStyle(
        'position:relative;min-height:100vh;' +
          'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-brand-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <SiteNav variant="paper" />

      <main>
        <div style={bodyPad}>
          <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:0`)}>
            {content.bio.name}
          </Text>
          <Text as="p" role="title-medium" style={parseStyle(`${SERIF};${INK};margin:0.75rem 0 0`)}>
            {content.bio.role}
          </Text>
          {content.degree ? (
            <Text as="p" role="body-large" style={parseStyle(`${SERIF};${MUTED};margin:0.35rem 0 0`)}>
              {content.degree.title}, {content.degree.org}, {content.degree.years}
            </Text>
          ) : null}
          <Text
            as="p"
            role="body-large"
            style={parseStyle(`${SERIF};${INK};margin:1.5rem 0 0;line-height:1.65`)}
          >
            {content.bio.statement}
          </Text>
          <Text
            as="p"
            role="title-medium"
            style={parseStyle(`${SERIF};${INK};margin:1.25rem 0 0;max-width:36ch`)}
          >
            {content.question}
          </Text>
          <Text
            as="p"
            role="label-small"
            style={parseStyle(`${MONO};${MUTED};margin:1rem 0 0;--m3-track:0.04em`)}
          >
            {content.affiliations}
          </Text>
        </div>

        <div style={insetPad}>
          <Theme
            name="study-dark"
            style={parseStyle(
              'background:var(--md-sys-color-surface-container-lowest);padding:1.25rem',
            )}
          >
            <KanagawaField
              mode={fieldMode}
              onMode={(id) => {
                const nextCol = MODES_TO_COL[id];
                lock(row, nextCol, null);
              }}
            />
          </Theme>
          <Caption text={content.fig1.caption} highlight={content.fig1.highlight} />
        </div>

        <div style={bodyPad}>
          <Text
            as="p"
            role="label-small"
            style={parseStyle(`${MONO};${MUTED};--m3-track:0.16em;margin:0`)}
          >
            {content.thesis.kicker}
          </Text>
          <Text
            as="h2"
            role="headline-medium"
            style={parseStyle(`${INK};margin:0.75rem 0 0`)}
          >
            {content.thesis.title.join(' ')}
          </Text>
          <Text
            as="p"
            role="body-large"
            style={parseStyle(`${SERIF};${INK};margin:1.25rem 0 0;line-height:1.65`)}
          >
            {content.thesis.lead}
          </Text>
          {content.thesis.prose.map((p) => (
            <Text
              key={p.slice(0, 24)}
              as="p"
              role="body-large"
              style={parseStyle(`${SERIF};${INK};margin:1.25rem 0 0;line-height:1.65`)}
            >
              {p}
            </Text>
          ))}
        </div>

        <div style={pagePad}>
          <PullQuote quote={content.thesis.quote} />
        </div>

        <div style={pagePad} id="matrix">
          <MethodMatrix
            row={row}
            col={col}
            onRow={(i) => lock(i, null, null)}
            onCell={(i, j) => lock(i, j, null)}
          />
          <Caption text={content.fig2.caption} highlight={content.fig2.highlight} />
        </div>

        <div style={outsetPad}>
          {clip ? (
            <MediaFigure
              src={clip.src}
              alt={clip.alt}
              caption={clip.caption}
              highlight={clip.highlight}
              poster={clip.poster}
              lazy={false}
            />
          ) : (
            <Caption
              text={
                rowNote
                  ? `${rowNote} Framing, not measured results.`
                  : 'Hover a column in Figure 2 for a coupled clip. Framing, not measured results.'
              }
              highlight="Framing, not measured"
            />
          )}
        </div>

        <div style={pagePad}>
          <TrustRamp
            active={band}
            onBand={(id) => lock(row, null, id)}
          />
        </div>

        <div style={{ ...bodyPad, paddingBottom: '6rem' }}>
          <dl style={parseStyle(`margin:0;padding:0;border-top:${HAIRLINE}`)}>
            {content.index.map((item) => (
              <div
                key={item.label}
                style={parseStyle(
                  `display:flex;gap:1.5rem;align-items:baseline;padding:0.85rem 0;border-bottom:${HAIRLINE}`,
                )}
              >
                <Text as="dt" role="label-small" style={parseStyle(`${MONO};${MUTED};flex:none;width:7rem`)}>
                  {item.external ? (
                    <a href={item.to} style={linkStyle} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} style={linkStyle}>
                      {item.label}
                    </Link>
                  )}
                </Text>
                <Text as="dd" role="body-medium" style={parseStyle(`${SERIF};${MUTED};margin:0`)}>
                  {item.note}
                </Text>
              </div>
            ))}
          </dl>
          <Text
            as="p"
            role="label-small"
            style={parseStyle(`${MONO};${MUTED};margin:2.5rem 0 0`)}
          >
            {content.footNote}
          </Text>
        </div>
      </main>
    </Theme>
  );
}

const MODES_TO_COL = { waves: 0, dots: 1, lattice: 2 };

const bodyPad = parseStyle('max-width:42rem;margin:0 auto;padding:4rem 1.5rem 0');
const pagePad = parseStyle('max-width:940px;margin:0 auto;padding:3rem 1.5rem 0');
const insetPad = parseStyle('max-width:min(100%, 72rem);margin:0 auto;padding:2.5rem 1.5rem 0');
const outsetPad = parseStyle('max-width:52rem;margin:0 auto;padding:2.5rem 1.5rem 0');

function MethodMatrix({ row, col, onRow, onCell }) {
  const cols = content.fig2.columns;
  return (
    <div
      role="table"
      aria-label="Five techniques, four fields"
      style={parseStyle(
        `border:${HAIRLINE};background:var(--md-sys-color-surface)`,
      )}
    >
      <div
        role="row"
        style={parseStyle(
          'display:grid;grid-template-columns:minmax(9rem,1.35fr) repeat(4,minmax(0,1fr));' +
            'background:var(--md-sys-color-surface-container)',
        )}
      >
        <Text
          as="div"
          role="label-small"
          style={parseStyle(
            `${MONO};${MUTED};--m3-track:0.1em;padding:11px 14px;border-bottom:${HAIRLINE}`,
          )}
        >
          {content.methodMeta.headLabel}
        </Text>
        {cols.map((label) => (
          <Text
            key={label}
            as="div"
            role="label-small"
            style={parseStyle(
              `${MONO};${MUTED};--m3-track:0.1em;padding:11px 14px;border-bottom:${HAIRLINE};` +
                `border-left:${HAIRLINE}`,
            )}
          >
            {label}
          </Text>
        ))}
      </div>
      {content.matrixRows.map((entry, i) => {
        const rowOn = row === i && col === null;
        const load = i === content.fig2.defaultRow;
        return (
          <div
            key={entry.method}
            role="row"
            style={parseStyle(
              'display:grid;grid-template-columns:minmax(9rem,1.35fr) repeat(4,minmax(0,1fr));' +
                (rowOn || (load && col === null && row === i)
                  ? 'background:var(--md-sys-color-surface-container)'
                  : ''),
            )}
          >
            <button
              type="button"
              onMouseEnter={() => onRow(i)}
              onFocus={() => onRow(i)}
              style={parseStyle(
                'display:block;width:100%;text-align:left;padding:13px 14px;margin:0;' +
                  `border:0;border-bottom:${HAIRLINE};background:none;cursor:pointer;font:inherit;` +
                  (load ? 'box-shadow:inset 2px 0 0 var(--md-sys-color-primary)' : ''),
              )}
            >
              <Text as="span" role="body-medium" emphasized={row === i} style={parseStyle(INK)}>
                {entry.method}
              </Text>
            </button>
            {entry.cells.map((cell, j) => {
              const on = row === i && col === j;
              return (
                <button
                  key={cols[j]}
                  type="button"
                  onMouseEnter={() => onCell(i, j)}
                  onFocus={() => onCell(i, j)}
                  style={parseStyle(
                    'display:block;width:100%;text-align:left;padding:13px 14px;margin:0;' +
                      `border:0;border-bottom:${HAIRLINE};border-left:${HAIRLINE};` +
                      'cursor:pointer;font:inherit;' +
                      (on
                        ? 'background:var(--md-sys-color-surface-container);'
                        : 'background:transparent;'),
                  )}
                >
                  <Text
                    as="span"
                    role="body-small"
                    style={parseStyle(
                      `${MONO};${on ? INK : MUTED};line-height:1.45`,
                    )}
                  >
                    {cell}
                  </Text>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function TrustRamp({ active, onBand }) {
  return (
    <div
      style={parseStyle(
        `display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-top:${HAIRLINE};padding-top:0`,
      )}
    >
      {content.ramp.map((step) => {
        const on = active === step.id;
        return (
          <Link
            key={step.id}
            to={`/trust#${step.id}`}
            onMouseEnter={() => onBand(step.id)}
            onFocus={() => onBand(step.id)}
            style={parseStyle(
              `display:block;padding:1rem 0.85rem;text-decoration:none;border-bottom:${HAIRLINE};` +
                `border-right:${HAIRLINE};` +
                (on ? 'background:var(--md-sys-color-surface-container)' : ''),
            )}
          >
            <Text
              as="span"
              role="label-small"
              emphasized={on}
              style={parseStyle(
                `${MONO};--m3-track:0.12em;color:var(--md-sys-color-${on ? 'primary' : 'on-surface'})`,
              )}
            >
              {step.name}
            </Text>
            <Text
              as="span"
              role="body-small"
              style={parseStyle(`${MUTED};display:block;margin:0.4rem 0 0;line-height:1.5`)}
            >
              {step.gloss}
            </Text>
          </Link>
        );
      })}
    </div>
  );
}
