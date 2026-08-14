import Section, { Body, H2 } from '../../components/Section.jsx';
import MediaFigure, { Caption, FigurePair } from '../../components/MediaFigure.jsx';
import DataTable from '../../components/DataTable.jsx';
import BuildList from '../../components/BuildList.jsx';
import CircuitLab from '../../components/CircuitLab.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import study from '../../content/caseStudies/conditional-gqe.js';

const s = study.sections;

/**
 * Body of /work/conditional-gqe. The shell (nav, hero, meta, next links) is
 * CaseStudy.jsx; everything below is the numbered sections in page order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype: 0 is the hero,
 * 1..5 are the sections that carry `ref={{ page.refs.N }}`. Sections 02b and
 * "check it" have no ref in the prototype and so are not revealed here either.
 */
export default function ConditionalGqe() {
  return (
    <>
      <Section num={s.constraint.num} kicker={s.constraint.kicker} reveal={1}>
        <H2>{s.constraint.h2}</H2>
        <Body>{s.constraint.body[0]}</Body>
        <Body spacing="spaced">{s.constraint.body[1]}</Body>
      </Section>
      <FigurePair figures={s.constraint.pair} />

      <Section num={s.method.num} kicker={s.method.kicker} reveal={2}>
        <H2>{s.method.h2}</H2>
        <Body>
          <Emphasise text={s.method.body} word={s.method.emphasis} />
        </Body>
        <BuildList items={s.method.buildList} />
        <Body spacing="top">{s.method.closing}</Body>
      </Section>
      <FigurePair figures={s.method.pair} />

      <Section num={s.learning.num} kicker={s.learning.kicker}>
        <H2>{s.learning.h2}</H2>
        <Body>{s.learning.body}</Body>
        <Body spacing="top">{s.learning.closing}</Body>
      </Section>

      <Section num={s.results.num} kicker={s.results.kicker} reveal={3}>
        <H2>{s.results.h2}</H2>
        <Body>{s.results.body}</Body>
        <div style={{ margin: '30px 0 0' }}>
          <DataTable head={s.results.tableHead} rows={s.results.tableRows} />
        </div>
        <Caption
          text={s.results.tableCaption}
          highlight={s.results.tableCaptionHighlight}
          tight
        />
        <MediaFigure
          src={s.results.figure.src}
          alt={s.results.figure.alt}
          caption={s.results.figure.caption}
          style="margin:30px 0 0"
          tight
        />
        <Body spacing="top">{s.results.closing}</Body>
      </Section>

      <Section num={s.limits.num} kicker={s.limits.kicker} reveal={4}>
        <H2>{s.limits.h2}</H2>
        <Body>{s.limits.body[0]}</Body>
        <Body spacing="spaced">{s.limits.body[1]}</Body>
        <Body spacing="spaced">{s.limits.body[2]}</Body>
      </Section>

      <Section num={s.checkIt.num} kicker={s.checkIt.kicker}>
        <H2>{s.checkIt.h2}</H2>
        <Body>{s.checkIt.body}</Body>
        <CircuitLab />
        <Caption
          text={s.checkIt.caption}
          highlight={s.checkIt.captionHighlight}
        />
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

/** The prototype italicises one word inside the method paragraph. */
function Emphasise({ text, word }) {
  if (!word) return text;
  const at = text.indexOf(word);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em>{word}</em>
      {text.slice(at + word.length)}
    </>
  );
}
