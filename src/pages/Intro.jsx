import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import KanagawaPlate from '../components/KanagawaPlate.jsx';
import content from '../content/intro.js';

function laneClass(id, active) {
  return ['folio__lane', `folio__lane--${id}`, active === id ? 'is-on' : '']
    .filter(Boolean)
    .join(' ');
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

/** / — plate owns the viewport; bio lives on one slip under the print. */
export default function Intro() {
  const [lane, setLane] = useState(null);

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  return (
    <Theme name="study" className="folio">
      <SiteNav variant="paper" overlay />

      <main className="folio__stage">
        <figure className="folio__print">
          <KanagawaPlate src={content.plate.src} alt={content.plate.alt}>
            <div className="folio__thirds">
              {content.rooms.map((room) => (
                <Link
                  key={room.id}
                  to={room.to}
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
            <h1 className="folio__name">{content.bio.name}</h1>
            <p className="folio__degree">{content.degree.title}</p>
            <Text as="p" role="body-medium">
              {content.bio.statement}
            </Text>
            <p className="folio__caption">
              <Marked text={content.plate.caption} highlight={content.plate.highlight} />
            </p>
          </figcaption>
        </figure>
      </main>
    </Theme>
  );
}
