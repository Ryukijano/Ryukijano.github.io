import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import useReveal from '../components/useReveal.js';
import { joinStyle, parseStyle } from '../lib/style.js';
import trust, { bandIds } from '../content/trust.js';

/**
 * /trust — ported from "Index - What We Trust.dc.html".
 *
 * The same eleven projects as /work, sorted by provenance instead of subject:
 * how much of what a system reports was recorded by something, and how much
 * was supplied by a model. SECTION_COUNT in the prototype is 6 — the framing
 * section, the four bands, and the closing — and that is the number of reveal
 * slots here.
 *
 * Every sentence on the page comes from src/content/trust.js. What lives here
 * is layout, tokens and motion.
 */
const SECTION_COUNT = 6;

/*
 * study-dark.
 *
 * The three dark ramps share one neutral spine and differ only in their
 * accent, so this is a choice of accent rather than of ground. The page is a
 * second index over all eleven projects, not a persona, and its argument runs
 * cool to warm — so the warm terracotta the case studies already wear is the
 * accent that agrees with the ramp instead of fighting it.
 *
 * The trust band colours below deliberately do NOT retheme. They are semantic:
 * "measured" has to mean the same thing on every page it ever appears on, the
 * way an error colour does.
 */
const THEME = 'study-dark';

/**
 * The four provenance bands, in the order the content module declares rather
 * than the order `trust.bands` happens to be arranged in. That ordering is the
 * page's whole argument — read left to right the ramp goes cool to warm, from
 * "a sensor recorded it" to "nothing to check it against" — so it comes from
 * one authority, and `rampGloss` is zipped onto it by the same index.
 */
const BANDS = bandIds.map((id, i) => ({
  ...trust.bands.find((b) => b.id === id),
  gloss: trust.rampGloss[i],
}));

/**
 * Band colour tokens are built from the band id. Four sets of hand-written
 * names would be four places to forget when a fifth band arrives.
 *
 * `role` is '' for the band colour itself, 'container' for the faint tint and
 * 'outline' for a border that reads as the band.
 */
const bandToken = (id, role) => `var(--md-sys-trust-${id}${role ? `-${role}` : ''})`;

/** Mono with tabular numerals: chips, counts, labels, the test lines, the foot. */
const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';

/**
 * The third text rank. M3 stops at on-surface-variant, so rather than pick a
 * dimmer grey by eye the quietest tier is a mix of the role that already owns
 * secondary text — counts, keys, kickers, the foot.
 */
const DIM = 'color-mix(in srgb, var(--md-sys-color-on-surface-variant) 74%, transparent)';

/* Cards and doors step up a tone instead of casting a shadow: on a near-black
 * ground a shadow barely registers, which is why M3 layers dark surfaces by
 * tone. The classes come from the component layer so the state wash, the focus
 * ring and the hover shape-morph all arrive with them. Card renders an <a> or a
 * <div>, never a router Link, so the link-cards borrow its classes directly. */
const CARD_LINK = 'm3-card m3-card--outlined m3-state';
const CARD_TONE = 'background:var(--md-sys-color-surface-container)';

/** N projects, pluralised. The only string on the page that isn't in trust.js —
 *  it is a derived count rather than prose, and the prototype derives it too. */
const projectCount = (n) => (n === 1 ? '1 project' : `${n} projects`);

export default function Trust() {
  /* Six slots: framing, the four bands, closing. useReveal already splits the
   * two properties across the two spring families — transform on a spatial
   * curve, which overshoots, opacity on an effects curve, which must not, or
   * the fade visibly flickers past full opacity. The prototype's own threshold
   * and 12px nudge carry over. No per-index delay: these are whole page
   * sections met one at a time, not a stagger group, and a delay on a section
   * you have already scrolled to reads as lag. */
  const reveal = useReveal(SECTION_COUNT, { threshold: 0.06, distance: 12, delayFor: null });

  useEffect(() => {
    document.title = 'What we trust — Gyanateet Dutta';
  }, []);

  return (
    <Theme
      name={THEME}
      style={parseStyle(
        'min-height:100vh;background:var(--md-sys-color-surface);' +
          'color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-plain-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <SiteNav variant="ink" />
      <div style={parseStyle('max-width:880px;margin:0 auto;padding:0 32px 130px')}>
        <header style={parseStyle('padding:64px 0 0')}>
          <Text
            role="label-small"
            style={parseStyle(
              `${MONO};--m3-track:0.14em;color:var(--md-sys-color-primary);margin:0 0 20px`,
            )}
          >
            {trust.kicker}
          </Text>
          {/* display-small carries the brand face, weight and tracking; the size
              is fluid because this one is a poster, not a paragraph. */}
          <Text
            as="h1"
            role="display-small"
            style={parseStyle(
              '--m3-size:clamp(2rem,6vw,2.75rem);--m3-lh:1.08;--m3-track:-0.02em;' +
                'color:var(--md-sys-color-on-surface);margin:0 0 22px',
            )}
          >
            {trust.h1}
          </Text>
          <Text
            role="body-large"
            style={parseStyle(
              '--m3-lh:1.7;color:var(--md-sys-color-on-surface);margin:0 0 16px;max-width:62ch',
            )}
          >
            {trust.lead}
          </Text>
          <Text
            role="body-medium"
            style={parseStyle(
              '--m3-lh:1.78;color:var(--md-sys-color-on-surface-variant);margin:0;max-width:66ch',
            )}
          >
            {trust.lead2}
          </Text>

          <Ramp />
        </header>

        <RevealSection reveal={reveal} index={0} padding="62px 0 0">
          <H2>{trust.framing.h2}</H2>
          {trust.framing.body.map((line) => (
            <P key={line}>{line}</P>
          ))}
          <Text
            role="label-small"
            style={parseStyle(`${MONO};--m3-lh:1.7;color:${DIM};margin:6px 0 0`)}
          >
            {trust.framing.quiet}
          </Text>
        </RevealSection>

        {BANDS.map((band, i) => (
          <RevealSection key={band.id} id={band.id} reveal={reveal} index={i + 1}>
            <Band band={band} />
          </RevealSection>
        ))}

        <RevealSection reveal={reveal} index={5} padding="62px 0 0">
          <H2>{trust.closing.h2}</H2>
          {trust.closing.body.map((line) => (
            <P key={line}>{line}</P>
          ))}

          <div style={parseStyle('display:flex;gap:12px;flex-wrap:wrap;margin:26px 0 0')}>
            {trust.closing.doors.map((door) => (
              <Link
                key={door.to}
                to={door.to}
                className={CARD_LINK}
                style={parseStyle(
                  `${CARD_TONE};flex:1 1 240px;display:flex;flex-direction:column;gap:9px`,
                )}
              >
                <Text
                  as="span"
                  role="label-small"
                  style={parseStyle(`${MONO};--m3-track:0.12em;color:${DIM}`)}
                >
                  {door.kick}
                </Text>
                <Text
                  as="span"
                  role="body-large"
                  style={parseStyle('--m3-lh:1.4;color:var(--md-sys-color-on-surface)')}
                >
                  {door.title}
                </Text>
              </Link>
            ))}
          </div>

          <Text
            role="label-small"
            style={parseStyle(
              `${MONO};--m3-lh:1.85;color:${DIM};margin:40px 0 0;max-width:70ch;` +
                'padding-top:22px;border-top:1px solid var(--md-sys-color-outline-variant)',
            )}
          >
            {trust.closing.foot}
          </Text>
        </RevealSection>
      </div>
    </Theme>
  );
}

/**
 * The signature element. Four segments, one per band, each an anchor down to
 * its section.
 *
 * What makes it a ramp rather than four unrelated chips: the segments are one
 * strip of equal blocks with a hairline gap, each already tinted with its own
 * band container at rest, and each capped by a 2px bar in the full band
 * colour. Read left to right that is a continuous cool-to-warm gradient, and
 * the gradient is the argument — you can see the page's claim before you have
 * read a word of it. Nothing here depends on hue alone: the name, the count
 * and the gloss all survive greyscale.
 */
function Ramp() {
  return (
    <div
      style={parseStyle(
        'display:flex;gap:4px;flex-wrap:wrap;align-items:stretch;margin:34px 0 0;' +
          'padding-top:26px;border-top:1px solid var(--md-sys-color-outline-variant)',
      )}
    >
      {BANDS.map((band) => (
        <a
          key={band.id}
          href={`#${band.id}`}
          className="m3-state"
          style={parseStyle(
            'flex:1 1 190px;display:block;padding:15px 16px 16px;text-decoration:none;' +
              `background:${bandToken(band.id, 'container')};` +
              `border:1px solid ${bandToken(band.id, 'outline')};` +
              'border-radius:var(--md-sys-shape-corner-small);' +
              'color:var(--md-sys-color-on-surface-variant)',
          )}
        >
          {/* The bar is the ramp. Full radius on a 2px rule rather than the
              parent's 8px: inner = outer − padding leaves nothing to round, so
              a stadium end is the honest shape. */}
          <span
            aria-hidden="true"
            style={parseStyle(
              `display:block;height:2px;width:100%;background:${bandToken(band.id)};` +
                'border-radius:var(--md-sys-shape-corner-full)',
            )}
          />
          <Text
            as="span"
            role="label-small"
            emphasized
            style={parseStyle(
              `${MONO};--m3-track:0.13em;display:inline-block;` +
                `color:${bandToken(band.id)};margin:12px 8px 0 0`,
            )}
          >
            {band.name}
          </Text>
          <Text
            as="span"
            role="label-small"
            style={parseStyle(`${MONO};display:inline-block;color:${DIM}`)}
          >
            {band.cards.length}
          </Text>
          <Text
            as="span"
            role="body-small"
            style={parseStyle(
              '--m3-lh:1.55;display:block;margin-top:6px;' +
                'color:var(--md-sys-color-on-surface-variant)',
            )}
          >
            {band.gloss}
          </Text>
        </a>
      ))}
    </div>
  );
}

/**
 * One band: what it means, how you would check it, what is in it, and where
 * the definition frays. The band colour appears four times — chip label, chip
 * border, the head rule fading into the neutral outline, and the left edge of
 * every card — which is what makes a column of cards scan as one band.
 */
function Band({ band }) {
  return (
    <>
      <div style={parseStyle('display:flex;align-items:center;gap:14px;padding:52px 0 0')}>
        <Chip
          style={parseStyle(
            'letter-spacing:0.2em;flex:none;min-height:0;padding:5px 11px;' +
              'border-radius:var(--md-sys-shape-corner-extra-small);' +
              `color:${bandToken(band.id)};border-color:${bandToken(band.id, 'outline')}`,
          )}
        >
          {band.name}
        </Chip>
        {/* The rule carries the band out of the chip and hands it back to the
            page: band outline on the left, neutral outline on the right. */}
        <span
          aria-hidden="true"
          style={parseStyle(
            'flex:1;height:1px;background:linear-gradient(to right,' +
              `${bandToken(band.id, 'outline')},var(--md-sys-color-outline-variant))`,
          )}
        />
        <Text as="span" role="label-small" style={parseStyle(`${MONO};color:${DIM};flex:none`)}>
          {projectCount(band.cards.length)}
        </Text>
      </div>

      <Text
        role="body-large"
        style={parseStyle(
          '--m3-lh:1.7;color:var(--md-sys-color-on-surface);margin:18px 0 0;max-width:66ch',
        )}
      >
        {band.def}
      </Text>

      <Text
        role="label-small"
        style={parseStyle(
          `${MONO};--m3-lh:1.7;color:var(--md-sys-color-on-surface-variant);` +
            'margin:12px 0 20px;max-width:66ch;padding-left:14px;' +
            `border-left:1px solid ${bandToken(band.id, 'outline')}`,
        )}
      >
        {band.test}
      </Text>

      {band.cards.map((card) => (
        <ProjectCard key={card.to} card={card} bandId={band.id} />
      ))}

      <Text
        role="body-medium"
        style={parseStyle(
          '--m3-lh:1.75;color:var(--md-sys-color-on-surface-variant);margin:16px 0 0;' +
            'max-width:68ch;padding-left:15px;' +
            'border-left:1px solid var(--md-sys-color-outline-variant)',
        )}
      >
        {band.note}
      </Text>
    </>
  );
}

/* Two labelled rows per card. The 104px column keeps OUTPUTS and BELIEVE IT IF
 * aligned down the whole page, so the second row of any card can be read as a
 * column of its own. The hairline is the neutral outline, not the band's — the
 * band already owns the left edge, and a second band-coloured rule inside the
 * card would compete with it. */
const CARD_ROW =
  'display:grid;grid-template-columns:104px 1fr;gap:16px;align-items:start;' +
  'padding:9px 0;border-top:1px solid var(--md-sys-color-outline-variant)';

function ProjectCard({ card, bandId }) {
  return (
    <Link
      to={card.to}
      className={CARD_LINK}
      /* No border-radius here on purpose: .m3-card rests at extra-large and
       * morphs to extra-large-increased on hover, and an inline radius would
       * beat the stylesheet and kill the morph. The inline border-left survives
       * the hover border-color because the longhand wins over the shorthand. */
      style={parseStyle(`${CARD_TONE};margin:0 0 12px;border-left:2px solid ${bandToken(bandId)}`)}
    >
      <span
        style={parseStyle(
          'display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 16px;margin-bottom:13px',
        )}
      >
        <Text
          as="span"
          role="title-medium"
          emphasized
          style={parseStyle('color:var(--md-sys-color-on-surface)')}
        >
          {card.t}
        </Text>
        <Text as="span" role="label-small" style={parseStyle(`${MONO};color:${DIM}`)}>
          {card.m}
        </Text>
      </span>

      <CardRow label="OUTPUTS" value={card.o} />
      <CardRow label="BELIEVE IT IF" value={card.b} />
    </Link>
  );
}

function CardRow({ label, value }) {
  return (
    <span style={parseStyle(CARD_ROW)}>
      <Text
        as="span"
        role="label-small"
        style={parseStyle(`${MONO};--m3-track:0.11em;color:${DIM};padding-top:3px`)}
      >
        {label}
      </Text>
      <Text
        as="span"
        role="body-medium"
        style={parseStyle('--m3-lh:1.7;color:var(--md-sys-color-on-surface-variant)')}
      >
        {value}
      </Text>
    </span>
  );
}

/**
 * One reveal slot. `scroll-margin-top` is what makes the ramp's anchors land
 * with the band head clear of the top edge rather than flush against it.
 */
function RevealSection({ id, reveal, index, padding = '0', children }) {
  return (
    <section
      id={id}
      ref={reveal.attach(index)}
      style={parseStyle(
        joinStyle(reveal.style(index), `padding:${padding}`, 'scroll-margin-top:24px'),
      )}
    >
      {children}
    </section>
  );
}

/** Headings take the brand face; body takes the plain face at reading size. */
function H2({ children }) {
  return (
    <Text
      as="h2"
      role="headline-small"
      style={parseStyle('--m3-track:-0.012em;color:var(--md-sys-color-on-surface);margin:0 0 16px')}
    >
      {children}
    </Text>
  );
}

function P({ children }) {
  return (
    <Text
      role="body-medium"
      style={parseStyle(
        '--m3-lh:1.78;color:var(--md-sys-color-on-surface-variant);margin:0 0 15px;max-width:68ch',
      )}
    >
      {children}
    </Text>
  );
}
