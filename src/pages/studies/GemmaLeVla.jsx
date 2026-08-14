import Section, { Body, H2 } from '../../components/Section.jsx';
import { FigurePair } from '../../components/MediaFigure.jsx';
import BuildList from '../../components/BuildList.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import { Text } from '../../components/m3/index.jsx';
import study from '../../content/caseStudies/gemma-le-vla.js';

const s = study.sections;

/**
 * Body of /work/gemma-le-vla. The shell (nav, hero, meta, next link) is
 * CaseStudy.jsx; everything below is the two-up figure pair and then the
 * numbered sections in page order.
 *
 * SECTION_COUNT in the prototype is 5, one fewer than its siblings: slot 0 is
 * the hero and 1..4 are the numbered sections, so the last reveal index here
 * is 4. The figure pair sits inside the prototype's own hero block (refs.0),
 * which the shell already owns, so it renders static rather than claiming a
 * reveal slot of its own.
 */
export default function GemmaLeVla() {
  return (
    <>
      <FigurePair figures={study.figurePair} />

      <Section num={s.problem.num} kicker={s.problem.kicker} reveal={1}>
        <H2>{s.problem.h2}</H2>
        <Body>{s.problem.body[0]}</Body>
        <Body spacing="spaced">{s.problem.body[1]}</Body>
      </Section>

      <Section num={s.engineering.num} kicker={s.engineering.kicker} reveal={2}>
        <H2>{s.engineering.h2}</H2>
        <Body>{s.engineering.body}</Body>
        <StackTable rows={s.engineering.stack} />
        <Body spacing="top">{s.engineering.closing}</Body>
        <BuildList items={s.engineering.buildList} />
      </Section>

      <Section num={s.learned.num} kicker={s.learned.kicker} reveal={3}>
        <H2>{s.learned.h2}</H2>
        <Body>{s.learned.body[0]}</Body>
        <Body spacing="spaced">{s.learned.body[1]}</Body>
        <Body spacing="spaced">{s.learned.body[2]}</Body>
      </Section>

      {/* No heading in the prototype — the section is the link grid. The rule
        * under it is the shell's own Divider, so this one carries none. */}
      <Section
        num={s.resources.num}
        kicker={s.resources.kicker}
        reveal={4}
        border={false}
      >
        <LinkList links={s.resources.links} />
      </Section>
    </>
  );
}

/**
 * The component table: stage and part name in the narrow column, what it does
 * in the wide one. Not a DataTable — there is no header row and no numeric
 * column to align, and each row's first cell is two lines rather than one.
 */
function StackTable({ rows = [] }) {
  return (
    <div style={frameStyle}>
      {rows.map((row, i) => (
        <div
          key={row.stage}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '28px',
            alignItems: 'start',
            padding: '20px 18px',
            borderBottom:
              i < rows.length - 1
                ? '1px solid var(--md-sys-color-outline-variant)'
                : undefined,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text as="span" role="label-small" style={stageStyle}>
              {row.stage}
            </Text>
            <Text as="span" role="body-large" emphasized>
              {row.name}
            </Text>
          </div>
          <Text as="p" role="body-medium" style={roleStyle}>
            {row.role}
          </Text>
        </div>
      ))}
    </div>
  );
}

/* Same frame as MediaFigure and DataTable use, so the three read as one
 * family down the page. */
const frameStyle = {
  border: '1px solid var(--md-sys-color-outline-variant)',
  borderRadius: 'var(--md-sys-shape-corner-medium)',
  overflow: 'hidden',
  background: 'var(--md-sys-color-surface)',
  margin: '34px 0 0',
};

const stageStyle = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  color: 'var(--md-sys-color-on-surface-variant)',
  letterSpacing: '0.1em',
};

const roleStyle = { color: 'var(--md-sys-color-on-surface-variant)', margin: 0 };
