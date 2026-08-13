import Section, { Body, H2 } from '../../components/Section.jsx';
import DataTable from '../../components/DataTable.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/fet-vae-surgical-prediction.js';

const s = study.sections;

/**
 * Body of /work/fet-vae-surgical-prediction. The shell (header, hero, meta,
 * next project) is CaseStudy.jsx; everything below is the numbered sections in
 * page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero
 * figure, 1..5 are the sections that carry `ref={{ page.refs.N }}`. Sections 02
 * and 04 carry no <h2> in the source and carry none here either.
 */
export default function FetVaeSurgicalPrediction() {
  return (
    <>
      <Section num={s.problem.num} kicker={s.problem.kicker} reveal={1}>
        <H2>{s.problem.h2}</H2>
        <Body>{s.problem.body[0]}</Body>
        <Body spacing="spaced">{s.problem.body[1]}</Body>
      </Section>

      <Section num={s.method.num} kicker={s.method.kicker} reveal={2}>
        <Body>{s.method.body}</Body>
        <div style={{ margin: '34px 0 0' }}>
          <DataTable
            head={s.method.tableHead}
            rows={s.method.tableRows}
            columns="0.9fr 1.2fr 2.4fr"
          />
        </div>
        <Body spacing="top">{s.method.closing}</Body>
      </Section>

      <Section num={s.finding.num} kicker={s.finding.kicker} reveal={3}>
        <H2>{s.finding.h2}</H2>
        <Body>{s.finding.body[0]}</Body>
        <Body spacing="spaced">{s.finding.body[1]}</Body>
      </Section>

      <Section num={s.inContext.num} kicker={s.inContext.kicker} reveal={4}>
        <Body>{s.inContext.body}</Body>
        <div style={{ margin: '26px 0 0' }}>
          <DataTable
            head={s.inContext.tableHead}
            rows={s.inContext.tableRows}
            columns="0.9fr 1.2fr 2.4fr"
          />
        </div>
      </Section>

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
