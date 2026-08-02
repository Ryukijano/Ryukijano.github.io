import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy.jsx';
import Section, { Body, H2 } from '../components/Section.jsx';
import PullQuote from '../components/PullQuote.jsx';
import MediaFigure from '../components/MediaFigure.jsx';
import { parseStyle } from '../lib/style.js';
import { fonts, light } from '../components/tokens.js';
import { getStudy } from '../content/caseStudies/index.js';
import ConditionalGqe from './studies/ConditionalGqe.jsx';

/**
 * Bodies that have been ported. Anything not in here renders the stub body,
 * which shows what is in the content module and names the prototype the rest
 * still lives in.
 */
const bodies = {
  'conditional-gqe': { Body: ConditionalGqe, sectionCount: 6 },
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (study) document.title = `${study.title} — Gyanateet Dutta`;
  }, [study, slug]);

  if (!study) return <NotFound slug={slug} />;

  const ported = bodies[slug];
  const BodyComponent = ported ? ported.Body : null;

  return (
    <CaseStudy study={study} sectionCount={ported ? ported.sectionCount : 2}>
      {BodyComponent ? <BodyComponent /> : <StubBody study={study} />}
    </CaseStudy>
  );
}

/**
 * A case study whose body has not been ported yet. It says so rather than
 * pretending, and it still renders whatever the content module does carry —
 * the pull quote on Dalton Mills, the second figure on NQCC.
 */
function StubBody({ study }) {
  return (
    <>
      {study.pullQuote ? (
        <PullQuote
          quote={study.pullQuote.quote}
          attribution={study.pullQuote.attribution}
        />
      ) : null}

      {study.secondFigure ? (
        <section style={{ padding: '40px 0 0' }}>
          <MediaFigure
            src={study.secondFigure.src}
            alt={study.secondFigure.alt}
            caption={study.secondFigure.caption}
            highlight={study.secondFigure.highlight}
          />
        </section>
      ) : null}

      <Section num="—" kicker="NOT YET PORTED" reveal={1}>
        <H2>The rest of this write-up is still in the prototype</H2>
        <Body>
          {`The hero, the meta bar and the lead figure above come from ${study.source}. The numbered sections of that file — constraint, method, results, limits, artefacts — have not been moved across yet.`}
        </Body>
        <Body spacing="spaced">
          Nothing has been paraphrased or filled in to cover the gap.
        </Body>
      </Section>
    </>
  );
}

function NotFound({ slug }) {
  return (
    <div
      style={parseStyle(
        `min-height:100vh;background:${light.paper};color:${light.ink};` +
          `font-family:${fonts.body};display:flex;align-items:center;justify-content:center`,
      )}
    >
      <div style={{ textAlign: 'center', padding: '0 40px' }}>
        <p
          style={parseStyle(
            `font-family:${fonts.mono};font-size:11px;letter-spacing:0.14em;color:${light.terracotta};margin:0 0 16px`,
          )}
        >
          NO SUCH CASE STUDY
        </p>
        <h1
          style={parseStyle(
            `font-family:${fonts.serif};font-weight:500;font-size:32px;margin:0 0 20px`,
          )}
        >
          {slug}
        </h1>
        <Link
          to="/work"
          style={parseStyle(
            `font-family:${fonts.mono};font-size:11px;letter-spacing:0.1em;color:${light.muted}`,
          )}
        >
          ← ALL PROJECTS
        </Link>
      </div>
    </div>
  );
}
