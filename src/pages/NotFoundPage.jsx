import { useState } from 'react';
import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { GLITCH_WAVE } from '../data/marks';
import Link from '../lib/Link';

/**
 * The one not-found sheet. 404.html is prerendered from it, and a missing
 * project slug renders it too, so what GitHub Pages serves for /work/<typo>
 * is the same markup React hydrates.
 */
export default function NotFoundPage() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
          This path isn&apos;t on the site.
        </h1>
        <figure className="plate">
          <div
            className="plate__sheet plate__sheet--loop"
            style={{
              aspectRatio: `${GLITCH_WAVE.width} / ${GLITCH_WAVE.height}`,
              '--plate-poster': `url(${GLITCH_WAVE.poster})`,
            }}
          >
            <picture>
              {playing ? null : (
                <source media="(prefers-reduced-motion: reduce)" srcSet={GLITCH_WAVE.poster} />
              )}
              <img
                src={GLITCH_WAVE.src}
                alt={GLITCH_WAVE.alt}
                width={GLITCH_WAVE.width}
                height={GLITCH_WAVE.height}
                decoding="async"
              />
            </picture>
            {/* The same play chip the figure loops carry: under reduced
                motion the still is the default, not the only option. */}
            <button
              type="button"
              className="plate__play"
              hidden={playing}
              aria-label="Play the loop"
              onClick={() => setPlaying(true)}
            >
              Play
            </button>
          </div>
          <figcaption className="plate__slip">
            <span className="plate__slug">Drawn</span>
            <span>
              {GLITCH_WAVE.caption}
              <em className="plate__scope"> {GLITCH_WAVE.scope}</em>
            </span>
          </figcaption>
          <span className="plate__kento" aria-hidden="true" />
        </figure>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
        </nav>
      </main>
    </div>
  );
}
