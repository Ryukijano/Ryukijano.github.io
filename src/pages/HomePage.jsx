import { useState } from 'react';
import KanagawaPlate from '../components/KanagawaPlate';
import SiteNav from '../components/SiteNav';
import { PLATE } from '../data/plate';
import { LANES } from '../data/portfolio';
import { ACADEMIC_BIO, EDUCATION } from '../data/publications';
import Link from '../lib/Link';


const ROOMS = LANES.map((lane) => ({
  id: lane.id,
  lane: lane.stage,
  handle: lane.handle,
  to: `/persona/${lane.slug}`,
}));

function laneClass(id, active) {
  return ['folio__lane', active === id ? 'is-on' : ''].filter(Boolean).join(' ');
}

function Marked({ text, highlight }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="folio__mark">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

/** / — one hung plate with kento in the margin; name, degree and bio on a slip under it. */
export default function HomePage() {
  const [lane, setLane] = useState(null);
  const degree = EDUCATION[0];


  return (
    <div className="folio">
      <SiteNav overlay hideWordmark />

      <main id="main" tabIndex={-1} className="route folio__stage">
        <figure className="folio__print">
          <KanagawaPlate
            src={PLATE.src}
            sources={PLATE.sources}
            alt={PLATE.alt}
            width={PLATE.width}
            height={PLATE.height}
          >
            <div className="folio__thirds">
              {ROOMS.map((room, index) => (
                <Link
                  key={room.id}
                  href={room.to}
                  className={laneClass(room.id, lane)}
                  aria-label={`${room.lane}: ${room.handle}`}
                  onMouseEnter={() => setLane(room.id)}
                  onMouseLeave={() => setLane(null)}
                  onFocus={() => setLane(room.id)}
                  onBlur={() => setLane(null)}
                >
                  <span className={index > 0 ? 'folio__chip folio__chip--after' : 'folio__chip'}>
                    {index > 0 ? <span className="folio__arrow" aria-hidden="true" /> : null}
                    {room.lane}
                    <span className="folio__chip-who">{room.handle}</span>
                  </span>
                </Link>
              ))}
            </div>
          </KanagawaPlate>

          <figcaption className="folio__slip">
            <div className="folio__slip-head">
              <h1 className="folio__name">{ACADEMIC_BIO.name}</h1>
              <span className="seal" aria-hidden="true">
                G
              </span>
            </div>
            {degree ? <p className="folio__degree">{degree.title}</p> : null}
            <nav className="folio__handles" aria-label="Lanes">
              {ROOMS.map((room, index) => (
                <span key={room.id}>
                  {index > 0 ? (
                    <span className="folio__handles-rule" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  <Link
                    href={room.to}
                    className={lane === room.id ? 'is-on' : undefined}
                    onMouseEnter={() => setLane(room.id)}
                    onMouseLeave={() => setLane(null)}
                    onFocus={() => setLane(room.id)}
                    onBlur={() => setLane(null)}
                  >
                    {room.handle}
                  </Link>
                </span>
              ))}
            </nav>
            <p className="folio__gloss">
              Three names, one person: systems, vision, quantum.
            </p>
            <p className="folio__bio">{ACADEMIC_BIO.statement}</p>
            <p className="folio__caption">
              <Marked text={PLATE.caption} highlight={PLATE.highlight} />
            </p>
            <p className="folio__gloss folio__gloss--foot">
              Every project on this site states its own limit.
            </p>
          </figcaption>
        </figure>

        <nav className="folio__lanes-list" aria-label="Lanes">
          {ROOMS.map((room, index) => (
            <Link key={room.id} href={room.to}>
              <span className="folio__lanes-lane">
                {index > 0 ? (
                  <span className="folio__lanes-seq" aria-hidden="true">
                    →
                  </span>
                ) : null}
                {room.lane}
              </span>
              <span className="folio__lanes-who">{room.handle}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
