import Section, { Body, H2 } from '../../components/Section.jsx';
import { Caption } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import PullQuote from '../../components/PullQuote.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/dalton-mills.js';

const s = study.sections;

/**
 * Body of /work/dalton-mills. The shell (nav, hero, meta, next links) is
 * CaseStudy.jsx; everything below is the numbered sections in page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero,
 * 1..5 are the sections that carry `ref={{ page.refs.N }}`. The pull quote
 * between 02 and 03 has no ref in the prototype, so it is not revealed here.
 */
export default function DaltonMills() {
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

      <PullQuote
        quote={study.pullQuote.quote}
        attribution={study.pullQuote.attribution}
      />

      <Section
        num={s.whatCameBack.num}
        kicker={s.whatCameBack.kicker}
        reveal={3}
      >
        <H2>{s.whatCameBack.h2}</H2>
        <Body>{s.whatCameBack.body}</Body>
        <div style={{ margin: '30px 0 0' }}>
          <DataTable
            head={s.whatCameBack.tableHead}
            rows={s.whatCameBack.tableRows}
            columns="1.1fr 1.9fr"
          />
        </div>
        <Caption text={s.whatCameBack.tableCaption} tight />
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
