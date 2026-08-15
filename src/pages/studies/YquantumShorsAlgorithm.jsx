import Section, { Body, H2 } from '../../components/Section.jsx';
import { LinkList } from '../../components/CaseStudy.jsx';
import { cs } from '../../components/tokens.js';
import { parseStyle } from '../../lib/style.js';
import study from '../../content/caseStudies/yquantum-shors-algorithm.js';

const s = study.sections;

/**
 * Body of /work/yquantum-shors-algorithm. The shell (header, hero, meta, next
 * link) is CaseStudy.jsx; everything below is the numbered sections in page
 * order.
 *
 * Reveal indices match SECTION_COUNT = 6 in the prototype, but that file
 * numbers them differently from its siblings: refs.0 is the hero figure rather
 * than the title block, so 1..5 are still the five numbered sections. Sections
 * 02, 04 and 05 carry no <h2> there and carry none here.
 *
 * Two of those sections use row layouts that exist nowhere else on the site —
 * the stage/name/role build steps and the place/event/description hackathon
 * record — so they are rendered locally rather than pushed into a shared
 * component that only one page would ever use.
 */
export default function YquantumShorsAlgorithm() {
  return (
    <>
      <Section num={s.problem.num} kicker={s.problem.kicker} reveal={1}>
        <H2>{s.problem.h2}</H2>
        <Body>{s.problem.body[0]}</Body>
        <Body spacing="spaced">
          <WithCode text={s.problem.body[1]} token={s.problem.bodyCode} />
        </Body>
      </Section>

      <Section num={s.method.num} kicker={s.method.kicker} reveal={2}>
        <Body>{s.method.body}</Body>
        <StepRows steps={s.method.steps} />
        <Body spacing="top">{s.method.closing}</Body>
      </Section>

      <Section num={s.finding.num} kicker={s.finding.kicker} reveal={3}>
        <H2>{s.finding.h2}</H2>
        <Body>{s.finding.body[0]}</Body>
        <Body spacing="spaced">{s.finding.body[1]}</Body>
      </Section>

      <Section num={s.inContext.num} kicker={s.inContext.kicker} reveal={4}>
        <Body>{s.inContext.body}</Body>
        <RecordRows record={s.inContext.record} />
      </Section>

      <Section num={s.resources.num} kicker={s.resources.kicker} reveal={5}>
        <LinkList links={s.resources.links} />
      </Section>
    </>
  );
}

/** The prototype sets one backend name in <code> inside that paragraph. */
function WithCode({ text, token }) {
  if (!token) return text;
  const at = text.indexOf(token);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <code style={{ fontSize: '13px' }}>{token}</code>
      {text.slice(at + token.length)}
    </>
  );
}

const ROW_BORDER = ';border-bottom:1px solid var(--md-sys-color-outline-variant)';

const stepRow = (last) =>
  'display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:start;' +
  'padding:20px 18px' +
  (last ? '' : ROW_BORDER);

const stepStage =
  'font-family:var(--md-sys-typescale-mono-font);font-size:10px;' +
  'color:var(--md-sys-color-on-surface-variant);letter-spacing:0.1em';

const stepName = 'font-size:15px;font-weight:500;color:var(--md-sys-color-on-surface)';

const stepRole =
  'font-size:13.5px;line-height:1.6;color:var(--md-sys-color-on-surface-variant);margin:0';

/** The four build stages, one per row, with no header row in the prototype. */
function StepRows({ steps }) {
  return (
    <div style={parseStyle(`${cs.figureFrame};margin:34px 0 0`)}>
      {steps.map((step, i) => (
        <div key={step.name} style={parseStyle(stepRow(i === steps.length - 1))}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={parseStyle(stepStage)}>{step.stage}</span>
            <span style={parseStyle(stepName)}>{step.name}</span>
          </div>
          <p style={parseStyle(stepRole)}>{step.role}</p>
        </div>
      ))}
    </div>
  );
}

const recordRow = (last) =>
  'display:flex;gap:24px;align-items:baseline;padding:20px 18px' + (last ? '' : ROW_BORDER);

const recordPlace =
  'font-family:var(--md-sys-typescale-mono-font);font-size:11px;' +
  'color:var(--md-sys-color-primary);letter-spacing:0.08em;flex:none;min-width:88px';

const recordEvent = 'font-size:14.5px;font-weight:500;margin:0 0 4px';

const recordDesc =
  'font-size:13px;line-height:1.6;color:var(--md-sys-color-on-surface-variant);margin:0';

/** The same year's hackathon record, again headerless in the prototype. */
function RecordRows({ record }) {
  return (
    <div style={parseStyle(`${cs.figureFrame};margin:26px 0 0`)}>
      {record.map((row, i) => (
        <div key={row.event} style={parseStyle(recordRow(i === record.length - 1))}>
          <span style={parseStyle(recordPlace)}>{row.place}</span>
          <div style={{ minWidth: 0 }}>
            <p style={parseStyle(recordEvent)}>{row.event}</p>
            <p style={parseStyle(recordDesc)}>{row.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
