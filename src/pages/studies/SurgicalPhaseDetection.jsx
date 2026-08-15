import Section, { Body, H2 } from '../../components/Section.jsx';
import { Caption } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import { Text } from '../../components/m3/index.jsx';
import study from '../../content/caseStudies/surgical-phase-detection.js';

const s = study.sections;

/**
 * Body of /work/surgical-phase-detection. The shell (header, hero, meta, next
 * project) is CaseStudy.jsx; everything below is the numbered sections in page
 * order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero
 * figure, 1..5 are the sections that carry `ref={{ page.refs.N }}`.
 */
export default function SurgicalPhaseDetection() {
  return (
    <>
      <Section num={s.problem.num} kicker={s.problem.kicker} reveal={1}>
        <H2>{s.problem.h2}</H2>
        <Body>{s.problem.body[0]}</Body>
        <Body spacing="spaced">{s.problem.body[1]}</Body>
      </Section>

      <Section num={s.engineering.num} kicker={s.engineering.kicker} reveal={2}>
        <H2>{s.engineering.h2}</H2>
        <Body>{s.engineering.body[0]}</Body>
        <Body spacing="spaced">{s.engineering.body[1]}</Body>
        <BuildList items={s.engineering.buildList} />
        <Body spacing="spaced">{s.engineering.closing}</Body>
      </Section>

      <Section num={s.results.num} kicker={s.results.kicker} reveal={3}>
        <StatsGrid items={s.results.stats} />
        <div style={{ margin: '52px 0 0' }}>
          <DataTable
            head={s.results.tableHead}
            rows={s.results.tableRows}
            columns="1.5fr 1fr 1fr 1fr 1fr"
          />
        </div>
        <Caption
          text={s.results.tableCaption}
          highlight={s.results.tableCaptionHighlight}
          tight
        />
        <Body spacing="top">{s.results.closing[0]}</Body>
        <Body spacing="spaced">{s.results.closing[1]}</Body>
        <Body spacing="spaced">{s.results.closing[2]}</Body>
      </Section>

      <Section num={s.resources.num} kicker={s.resources.kicker} reveal={4}>
        <LinkList links={s.resources.links} />
      </Section>

      <Section kicker={s.credits.kicker} reveal={5} border={false}>
        <Body>{s.credits.body}</Body>
      </Section>
    </>
  );
}

/**
 * The four headline figures at the top of RESULTS. Local to this page: no
 * other case study uses a stats row, so it stays here rather than becoming a
 * shared component.
 *
 * The prototype staggers each number in with a clip-path wipe. That is dropped
 * — the whole block already fades and slides in with its <Section reveal={3}>,
 * and a second motion layer inside an element that is itself still moving
 * fights the spatial spring rather than adding to it.
 */
function StatsGrid({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '52px 64px' }}>
      {items.map((st) => (
        <div key={st.value}>
          <Text as="p" role="display-small" emphasized style={valueStyle}>
            {st.value}
          </Text>
          <Text as="p" role="body-medium" style={labelStyle}>
            {st.label}
          </Text>
        </div>
      ))}
    </div>
  );
}

/* Ink, not terracotta: the prototype sets these in the body colour, and four
 * accent-coloured numbers in a row would read as links. Mono with tabular
 * numerals so 90.0% and 89.5% line up at the decimal. */
const valueStyle = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
  color: 'var(--md-sys-color-on-surface)',
  margin: 0,
};

const labelStyle = {
  color: 'var(--md-sys-color-on-surface-variant)',
  maxWidth: '200px',
  margin: '8px 0 0',
};
