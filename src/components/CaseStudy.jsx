import { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { fonts, light } from './tokens.js';
import useReveal, { RevealContext } from './useReveal.js';
import MediaFigure from './MediaFigure.jsx';

/**
 * The case-study page shell: breadcrumb nav, hero, meta bar, the hero figure,
 * whatever numbered sections the page supplies, then the next-links footer.
 *
 * `sectionCount` is the number of reveal slots the page uses. It matches
 * SECTION_COUNT in the corresponding .dc.html script block, and slot 0 is
 * always the hero.
 */
export default function CaseStudy({ study, sectionCount = 6, children }) {
  const reveal = useReveal(sectionCount);
  const hero = reveal.style(0);

  return (
    <div style={parseStyle(shellStyle)}>
      <article style={parseStyle('max-width:940px;margin:0 auto;padding:0 40px')}>
        <Nav breadcrumb={study.breadcrumb} />

        <section ref={reveal.attach(0)} style={parseStyle(hero)}>
          <div style={{ padding: '72px 0 0' }}>
            <p style={parseStyle(kickerStyle)}>{study.kicker}</p>
            <h1 style={parseStyle(titleStyle)}>{study.title}</h1>
            <p style={parseStyle(leadStyle)}>{study.lead}</p>
          </div>
          <MetaBar items={study.meta} />
        </section>

        {study.hero ? (
          <section style={{ padding: '56px 0 0' }}>
            <MediaFigure
              src={study.hero.src}
              alt={study.hero.alt}
              caption={study.hero.caption}
              highlight={study.hero.highlight}
              lazy={false}
            />
          </section>
        ) : null}

        <RevealContext.Provider value={reveal}>{children}</RevealContext.Provider>

        <div style={{ height: '1px', background: light.rule }} />

        <NextLinks items={study.next} />
      </article>
    </div>
  );
}

const shellStyle =
  `min-height:100vh;background:${light.paper};color:${light.ink};` +
  `font-family:${fonts.body};-webkit-font-smoothing:antialiased`;

const kickerStyle =
  `font-family:${fonts.mono};font-size:11px;letter-spacing:0.14em;` +
  `color:${light.terracotta};margin:0 0 22px`;

const titleStyle =
  `font-family:${fonts.serif};font-weight:500;font-size:46px;line-height:1.1;` +
  `letter-spacing:-0.02em;margin:0 0 24px;max-width:20ch`;

const leadStyle = `font-size:18px;line-height:1.6;color:${light.body};max-width:60ch;margin:0`;

function Nav({ breadcrumb }) {
  const [hover, setHover] = useState(false);
  const back =
    `font-family:${fonts.mono};font-size:11px;letter-spacing:0.1em;text-decoration:none;` +
    `color:${hover ? light.terracotta : light.muted};transition:color .3s`;

  return (
    <nav
      style={parseStyle(
        `display:flex;align-items:center;gap:14px;padding:34px 0;border-bottom:1px solid ${light.rule}`,
      )}
    >
      <Link
        to="/work"
        style={parseStyle(back)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        ← GYANATEET
      </Link>
      <span
        style={parseStyle(
          `font-family:${fonts.mono};font-size:11px;color:${light.divider}`,
        )}
      >
        /
      </span>
      <span
        style={parseStyle(
          `font-family:${fonts.mono};font-size:11px;letter-spacing:0.1em;color:${light.muted}`,
        )}
      >
        {breadcrumb}
      </span>
    </nav>
  );
}

function MetaBar({ items = [] }) {
  return (
    <div
      style={parseStyle(
        `display:flex;flex-wrap:wrap;gap:0;margin:52px 0 0;` +
          `border-top:1px solid ${light.rule};border-bottom:1px solid ${light.rule}`,
      )}
    >
      {items.map((item) => (
        <div key={item.k} style={parseStyle('flex:1 1 150px;padding:18px 0')}>
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:9.5px;letter-spacing:0.12em;color:${light.muted};margin:0 0 6px`,
            )}
          >
            {item.k}
          </p>
          <p style={parseStyle(`font-size:14px;color:${light.ink};margin:0`)}>
            {item.v}
          </p>
        </div>
      ))}
    </div>
  );
}

function NextLinks({ items = [] }) {
  const [hover, setHover] = useState(null);
  return (
    <section
      style={parseStyle('padding:64px 0 110px;display:flex;gap:20px;flex-wrap:wrap')}
    >
      {items.map((item, i) => {
        const on = hover === i;
        const style =
          `flex:1 1 240px;display:flex;flex-direction:column;gap:8px;padding:24px;` +
          `border:1px solid ${on ? light.terracotta : light.rule};border-radius:10px;` +
          `text-decoration:none;color:${on ? light.terracotta : light.ink};` +
          `background:${light.paper};transition:border-color .3s,color .3s`;
        const inner = (
          <>
            <span
              style={parseStyle(
                `font-family:${fonts.mono};font-size:10px;color:${light.muted};letter-spacing:0.1em`,
              )}
            >
              {item.kicker}
            </span>
            <span
              style={parseStyle(
                `font-family:${fonts.serifShort};font-size:19px;line-height:1.3`,
              )}
            >
              {item.title}
            </span>
          </>
        );
        const handlers = {
          onMouseEnter: () => setHover(i),
          onMouseLeave: () => setHover(null),
        };
        return item.to.startsWith('http') ? (
          <a
            key={i}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            style={parseStyle(style)}
            {...handlers}
          >
            {inner}
          </a>
        ) : (
          <Link key={i} to={item.to} style={parseStyle(style)} {...handlers}>
            {inner}
          </Link>
        );
      })}
    </section>
  );
}

/** The artefacts block: kind, label, host. Always external. */
export function LinkList({ links = [] }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ margin: '22px 0 0' }}>
      {links.map((link, i) => {
        const on = hover === i;
        const row =
          `display:flex;align-items:baseline;gap:16px;padding:14px 16px;text-decoration:none;` +
          `color:${on ? light.terracotta : light.ink};` +
          `border:1px solid ${on ? light.terracotta : light.rule};border-radius:8px;` +
          `margin-bottom:9px;background:${light.paper};transition:border-color .3s,color .3s`;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={parseStyle(row)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span
              style={parseStyle(
                `font-family:${fonts.mono};font-size:9.5px;letter-spacing:0.1em;color:${light.muted};flex:none;width:64px`,
              )}
            >
              {link.kind}
            </span>
            <span style={parseStyle('font-size:14.5px;flex:1')}>{link.label}</span>
            <span
              style={parseStyle(
                `font-family:${fonts.mono};font-size:10.5px;color:${light.muted};flex:none`,
              )}
            >
              {link.meta}
            </span>
          </a>
        );
      })}
    </div>
  );
}

