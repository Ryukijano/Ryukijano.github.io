import Section, { Body, H2 } from '../../components/Section.jsx';
import { Caption } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/got-jepa-tool-tracking.js';

const s = study.sections;

/**
 * Body of /work/got-jepa-tool-tracking. The shell (nav, hero, meta, next
 * links) is CaseStudy.jsx; everything below is the numbered sections in page
 * order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero block,
 * 1..5 are the sections that carry `ref={{ page.refs.N }}`. The hero figure
 * sits in its own unrevealed section there, which is exactly how the shell
 * renders it.
 */
export default function GotJepaToolTracking() {
  return (
    <>
      <Section num={s.constraint.num} kicker={s.constraint.kicker} reveal={1}>
        <H2>{s.constraint.h2}</H2>
        <Body>{s.constraint.body[0]}</Body>
        <Body spacing="spaced">{s.constraint.body[1]}</Body>
      </Section>

      <Section num={s.method.num} kicker={s.method.kicker} reveal={2}>
        <H2>{s.method.h2}</H2>
        <Body>{s.method.body}</Body>
        <BuildList items={s.method.buildList} />
        <Body spacing="top">{s.method.closing}</Body>
      </Section>

      <Section num={s.state.num} kicker={s.state.kicker} reveal={3}>
        <H2>{s.state.h2}</H2>
        <Body>{s.state.body}</Body>
        <div style={{ margin: '30px 0 0' }}>
          <DataTable
            head={s.state.tableHead}
            rows={s.state.tableRows}
            columns="1.6fr 0.9fr 1.5fr"
            /* the prototype tints these: each marks a piece that is not
             * working yet, not a result */
            highlight={['paused', 'collapsed', 'blocked']}
          />
        </div>
        <Caption
          text={s.state.tableCaption}
          highlight={s.state.tableCaptionHighlight}
          tight
        />
        <Body spacing="top">{s.state.closing}</Body>
      </Section>

      <Section num={s.limits.num} kicker={s.limits.kicker} reveal={4}>
        <H2>{s.limits.h2}</H2>
        <Body>{s.limits.body[0]}</Body>
        <Body spacing="spaced">{s.limits.body[1]}</Body>
        <Body spacing="spaced">{s.limits.body[2]}</Body>
      </Section>

      <Section
        num={s.artefacts.num}
        kicker={s.artefacts.kicker}
        reveal={5}
        border={false}
      >
        <H2>{s.artefacts.h2}</H2>
        <LinkList links={s.artefacts.links} />
        <Body spacing="top">{s.artefacts.closing}</Body>
      </Section>
    </>
  );
}
