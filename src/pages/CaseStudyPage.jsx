import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy.jsx';
import Section, { Body, H2 } from '../components/Section.jsx';
import PullQuote from '../components/PullQuote.jsx';
import MediaFigure from '../components/MediaFigure.jsx';
import { Text, Theme } from '../components/m3/index.jsx';
import { getStudy } from '../content/caseStudies/index.js';
import ConditionalGqe from './studies/ConditionalGqe.jsx';
import CosmosSentinel from './studies/CosmosSentinel.jsx';
import DaltonMills from './studies/DaltonMills.jsx';
import FetVaeSurgicalPrediction from './studies/FetVaeSurgicalPrediction.jsx';
import GemmaLeVla from './studies/GemmaLeVla.jsx';
import GotJepaToolTracking from './studies/GotJepaToolTracking.jsx';
import NqccRollsRoyce from './studies/NqccRollsRoyce.jsx';
import PotholeDetection from './studies/PotholeDetection.jsx';
import SurgicalPhaseDetection from './studies/SurgicalPhaseDetection.jsx';
import SyndromeNet from './studies/SyndromeNet.jsx';
import YquantumShorsAlgorithm from './studies/YquantumShorsAlgorithm.jsx';

/**
 * Every case study, mapped to the component that renders its numbered
 * sections. Anything absent falls back to the stub body, which says so rather
 * than pretending; nothing is absent now.
 *
 * `sectionCount` is SECTION_COUNT from the corresponding .dc.html — the number
 * of reveal slots, slot 0 being the hero. It is 6 everywhere except
 * gemma-le-vla, whose prototype has one fewer numbered section.
 */
const bodies = {
  'conditional-gqe': { Body: ConditionalGqe, sectionCount: 6 },
  'cosmos-sentinel': { Body: CosmosSentinel, sectionCount: 6 },
  'dalton-mills': { Body: DaltonMills, sectionCount: 6 },
  'fet-vae-surgical-prediction': { Body: FetVaeSurgicalPrediction, sectionCount: 6 },
  'gemma-le-vla': { Body: GemmaLeVla, sectionCount: 5 },
  'got-jepa-tool-tracking': { Body: GotJepaToolTracking, sectionCount: 6 },
  'nqcc-rolls-royce': { Body: NqccRollsRoyce, sectionCount: 6 },
  'pothole-detection': { Body: PotholeDetection, sectionCount: 6 },
  'surgical-phase-detection': { Body: SurgicalPhaseDetection, sectionCount: 6 },
  'syndrome-net': { Body: SyndromeNet, sectionCount: 6 },
  'yquantum-shors-algorithm': { Body: YquantumShorsAlgorithm, sectionCount: 6 },
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
 *
 * The notice sits in its own tonal container so it reads as a disclosure
 * about the page rather than as one more section of the write-up.
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
        <div style={noticeStyle}>
          <H2>The rest of this write-up is still in the prototype</H2>
          <Body>
            {`The hero, the meta bar and the lead figure above come from ${study.source}. The numbered sections of that file — constraint, method, results, limits, artefacts — have not been moved across yet.`}
          </Body>
          <Body spacing="spaced">
            Nothing has been paraphrased or filled in to cover the gap.
          </Body>
        </div>
      </Section>
    </>
  );
}

/* Outer radius large-increased at 24px of padding, so anything nested inside
 * would want ~0 — which is why nothing inside it is rounded. */
const noticeStyle = {
  padding: '24px 28px',
  background: 'var(--md-sys-color-surface-container)',
  borderLeft: '3px solid var(--md-sys-color-outline)',
  borderRadius: 'var(--md-sys-shape-corner-large-increased)',
};

function NotFound({ slug }) {
  return (
    <Theme
      name="study"
      style={{
        minHeight: '100vh',
        background: 'var(--md-sys-color-surface)',
        color: 'var(--md-sys-color-on-surface)',
        fontFamily: 'var(--md-sys-typescale-plain-font)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', padding: '0 40px' }}>
        <Text
          as="p"
          role="label-medium"
          style={{
            '--m3-font': 'var(--md-sys-typescale-mono-font)',
            color: 'var(--md-sys-color-primary)',
            letterSpacing: '0.14em',
            margin: '0 0 16px',
          }}
        >
          NO SUCH CASE STUDY
        </Text>
        <Text
          as="h1"
          role="display-small"
          emphasized
          style={{ margin: '0 0 20px', wordBreak: 'break-word' }}
        >
          {slug}
        </Text>
        <Link to="/work" className="m3-button m3-button--text m3-state" style={backStyle}>
          ← ALL PROJECTS
        </Link>
      </div>
    </Theme>
  );
}

/* Colour comes from .m3-button--text (primary); only the face and the
 * tracking are the page's. */
const backStyle = {
  fontFamily: 'var(--md-sys-typescale-mono-font)',
  fontSize: 'var(--md-sys-typescale-label-small-size)',
  letterSpacing: '0.1em',
  /* base.css carries an unlayered `a { color: inherit }`, which outranks the
   * layered .m3-button--text rule, so the role colour is set here. */
  color: 'var(--md-sys-color-primary)',
};
