import Section, { Body, H2 } from '../../components/Section.jsx';
import { Caption } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/cosmos-sentinel.js';

const s = study.sections;

/**
 * Body of /work/cosmos-sentinel. The shell (nav, hero, meta, next links) is
 * CaseStudy.jsx; everything below is the numbered sections in page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero,
 * 1..5 are the five numbered sections, each of which carries a ref there.
 */
export default function CosmosSentinel() {
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

      <Section num={s.deployment.num} kicker={s.deployment.kicker} reveal={3}>
        <H2>{s.deployment.h2}</H2>
        <Body>{s.deployment.body}</Body>
        <div style={{ margin: '30px 0 0' }}>
          <DataTable
            head={s.deployment.tableHead}
            rows={s.deployment.tableRows}
            columns="1.15fr 0.9fr 1.6fr"
            /* the prototype tints this cell: it marks a stage that does not
             * run, not a measurement */
            highlight="skipped"
          />
        </div>
        <Caption
          text={s.deployment.tableCaption}
          highlight={s.deployment.tableCaptionHighlight}
          tight
        />
      </Section>

      <Section num={s.limits.num} kicker={s.limits.kicker} reveal={4}>
        <H2>{s.limits.h2}</H2>
        <Body>{s.limits.body[0]}</Body>
        <Body spacing="spaced">{s.limits.body[1]}</Body>
        <Body spacing="spaced">{s.limits.body[2]}</Body>
        <Body spacing="spaced">{s.limits.body[3]}</Body>
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
