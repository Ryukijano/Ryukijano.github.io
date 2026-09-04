import { useEffect, useState } from 'react';
import Atmosphere from '../components/Atmosphere';
import KanagawaPlate from '../components/KanagawaPlate';
import SiteNav from '../components/SiteNav';
import { DATA, LANES } from '../data/portfolio';
import { ACADEMIC_BIO, EDUCATION } from '../data/publications';
import Link from '../lib/Link';

const PLATE = {
  src: '/assets/images/kanagawa_latentspace_autoencoder.jpg',
  width: 3923,
  height: 2160,
  sources: [
    {
      type: 'image/webp',
      srcSet:
        '/assets/images/kanagawa-plate-1200.webp 1200w, /assets/images/kanagawa-plate-1800.webp 1800w, /assets/images/kanagawa-plate-2600.webp 2600w',
      sizes: '(max-width: 899px) 100vw, min(100vw, 1400px)',
    },
  ],
  alt: 'Kanagawa plate in three states: painted woodblock, RGB dither, neon wireframe',
  caption:
    'The plate is a schematic of a representation, not a measurement. Painted, dithered, wireframed. The three lanes are framing, not measured results.',
  highlight: 'schematic',
};

const ROOMS = LANES.map((lane) => ({
  id: lane.id,
  lane: lane.label,
  title: DATA[lane.id].title,
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

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  return (
    <div className="folio">
      <SiteNav overlay hideWordmark />
      <Atmosphere variant="film" />

      <main id="main" className="folio__stage">
        <figure className="folio__print">
          <KanagawaPlate
            src={PLATE.src}
            sources={PLATE.sources}
            alt={PLATE.alt}
            width={PLATE.width}
            height={PLATE.height}
          >
            <div className="folio__thirds">
              {ROOMS.map((room) => (
                <Link
                  key={room.id}
                  href={room.to}
                  className={laneClass(room.id, lane)}
                  aria-label={`${room.lane}: ${room.title}`}
                  onMouseEnter={() => setLane(room.id)}
                  onMouseLeave={() => setLane(null)}
                  onFocus={() => setLane(room.id)}
                  onBlur={() => setLane(null)}
                >
                  <span className="folio__chip">
                    {room.lane}
                    <span className="folio__chip-who">{room.title}</span>
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
            <p className="folio__bio">{ACADEMIC_BIO.statement}</p>
            <p className="folio__caption">
              <Marked text={PLATE.caption} highlight={PLATE.highlight} />
            </p>
          </figcaption>
        </figure>

        <nav className="folio__lanes-list" aria-label="Lanes">
          {ROOMS.map((room) => (
            <Link key={room.id} href={room.to}>
              <span className="folio__lanes-lane">{room.lane}</span>
              <span className="folio__lanes-who">{room.title}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
