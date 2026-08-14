import Section, { Body, H2 } from '../../components/Section.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import { Text } from '../../components/m3/index.jsx';
import study from '../../content/caseStudies/nqcc-rolls-royce.js';

const s = study.sections;

/**
 * Body of /work/nqcc-rolls-royce. The shell (nav, hero pair, meta, next link)
 * is CaseStudy.jsx; everything below is the numbered sections in page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero,
 * 1..5 are the numbered sections. The two SQD GIFs are the shell's heroPair.
 */
export default function NqccRollsRoyce() {
  return (
    <>
      <Section num={s.problem.num} kicker={s.problem.kicker} reveal={1}>
        <H2>{s.problem.h2}</H2>
        <Body>{s.problem.body[0]}</Body>
        <Body spacing="spaced">{s.problem.body[1]}</Body>
      </Section>

      <Section num={s.method.num} kicker={s.method.kicker} reveal={2}>
        <H2>{s.method.h2}</H2>
        <Body>{s.method.body}</Body>
        <StageTable rows={s.method.steps} />
        <Body spacing="top">{s.method.closing}</Body>
      </Section>

      <Section num={s.finding.num} kicker={s.finding.kicker} reveal={3}>
        <H2>{s.finding.h2}</H2>
        <Body>{s.finding.body[0]}</Body>
        <Body spacing="spaced">{s.finding.body[1]}</Body>
        <Body spacing="spaced">{s.finding.body[2]}</Body>
      </Section>

      {/* No heading in the prototype — one lead line, then the record. */}
      <Section num={s.inContext.num} kicker={s.inContext.kicker} reveal={4}>
        <Body>{s.inContext.body}</Body>
        <RecordList rows={s.inContext.record} />
      </Section>

      {/* No heading here either. The rule under this section is the shell's
        * own Divider, so it carries none of its own. */}
      <Section
        num={s.resources.num}
        kicker={s.resources.kicker}
        reveal={5}
        border={false}
      >
        <LinkList links={s.resources.links} />
      </Section>
    </>
  );
}

/**
 * The four pipeline stages: stage and name in the narrow column, what that
 * stage does in the wide one. Not a DataTable — there is no header row, no
 * numeric column to align, and the first cell of each row is two lines.
 */
function StageTable({ rows = [] }) {
  return (
    <div style={{ ...frameStyle, margin: '34px 0 0' }}>
      {rows.map((row, i) => (
        <div key={row.stage} style={rowStyle(i, rows.length, '200px 1fr', '28px')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text as="span" role="label-small" style={monoLabel}>
              {row.stage}
            </Text>
            <Text as="span" role="body-large" emphasized>
              {row.name}
            </Text>
          </div>
          <Text as="p" role="body-medium" style={proseStyle}>
            {row.role}
          </Text>
        </div>
      ))}
    </div>
  );
}

/** The other results from the same year: placing, event, what it was. */
function RecordList({ rows = [] }) {
  return (
    <div style={{ ...frameStyle, margin: '26px 0 0' }}>
      {rows.map((row, i) => (
        <div key={row.event} style={rowStyle(i, rows.length, '88px 1fr', '24px')}>
          <Text as="span" role="label-small" style={placeStyle}>
            {row.place}
          </Text>
          <div style={{ minWidth: 0 }}>
            <Text as="p" role="body-large" emphasized style={{ margin: '0 0 4px' }}>
              {row.event}
            </Text>
            <Text as="p" role="body-medium" style={proseStyle}>
              {row.desc}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

const rowStyle = (i, count, columns, gap) => ({
  display: 'grid',
  gridTemplateColumns: columns,
  gap,
  alignItems: 'start',
  padding: '20px 18px',
  borderBottom:
    i < count - 1 ? '1px solid var(--md-sys-color-outline-variant)' : undefined,
});

/* Same frame as MediaFigure and DataTable use, so the three read as one
 * family down the page. */
const frameStyle = {
  border: '1px solid var(--md-sys-color-outline-variant)',
  borderRadius: 'var(--md-sys-shape-corner-medium)',
  overflow: 'hidden',
  background: 'var(--md-sys-color-surface)',
};

const monoLabel = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  color: 'var(--md-sys-color-on-surface-variant)',
  letterSpacing: '0.1em',
};

/* The placing is the one figure in the row that matters, so it takes the
 * accent — as it does in the prototype. */
const placeStyle = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  color: 'var(--md-sys-color-primary)',
  letterSpacing: '0.08em',
};

const proseStyle = { color: 'var(--md-sys-color-on-surface-variant)', margin: 0 };
