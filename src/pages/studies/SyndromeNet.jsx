import Section, { Body, H2 } from '../../components/Section.jsx';
import { Caption } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/syndrome-net.js';

const s = study.sections;

/**
 * Body of /work/syndrome-net. The shell (nav, hero, meta, next links) is
 * CaseStudy.jsx; everything below is the numbered sections in page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero,
 * 1..5 are the five numbered sections, each of which carries a ref there.
 */
export default function SyndromeNet() {
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

      <Section num={s.scope.num} kicker={s.scope.kicker} reveal={3}>
        <H2>{s.scope.h2}</H2>
        <Body>{s.scope.body}</Body>
        <div style={{ margin: '30px 0 0' }}>
          <DataTable
            head={s.scope.tableHead}
            rows={s.scope.tableRows}
            columns="1.1fr 1.15fr 1.5fr"
          />
        </div>
        <Caption text={s.scope.tableCaption} tight />
        <Body spacing="top">{s.scope.closing}</Body>
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
