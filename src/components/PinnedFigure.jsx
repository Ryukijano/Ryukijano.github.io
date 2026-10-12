import { useState } from 'react';
import Link from '../lib/Link';

/**
 * A figure pinned to the sheet: the same block, sheet, caption slip and
 * scope line as a hung plate, plus a tilt and one fastener on its top edge.
 * Odd figures lean left under tape, even figures lean right under a pin.
 * `art` is an inlined study SVG; otherwise the figure is a still image.
 */
export default function PinnedFigure({ figure, art, index, from }) {
  const flip = index % 2 === 0;
  const { kind, src, poster, sources = [], width, height, alt, caption, scope } = figure;
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={`plate plate--pinned${flip ? ' plate--flip' : ''}`}>
      {flip ? (
        <span className="plate__pin" aria-hidden="true" />
      ) : (
        <span className="plate__tape" aria-hidden="true" />
      )}
      <div
        className={art ? 'plate__sheet study-art' : poster ? 'plate__sheet plate__sheet--loop' : 'plate__sheet'}
        style={{
          aspectRatio: `${width} / ${height}`,
          ...(poster && !art ? { '--plate-poster': `url(${poster})` } : {}),
        }}
      >
        {art ? (
          <div dangerouslySetInnerHTML={{ __html: art }} />
        ) : kind === 'video' ? (
          <video
            src={src}
            poster={poster}
            width={width}
            height={height}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          <picture>
            {/* First, so it wins: reduced motion swaps the loop for its still
                inside the same <img>, which keeps the alt text in the
                accessibility tree and never fetches the GIF until the reader
                asks for it with the play control, which drops the source. */}
            {poster && !playing ? (
              <source media="(prefers-reduced-motion: reduce)" srcSet={poster} />
            ) : null}
            {sources.map((source) => (
              <source key={source.srcSet} type={source.type} srcSet={source.srcSet} sizes={source.sizes} />
            ))}
            <img src={src} alt={alt} width={width} height={height} decoding="async" loading="lazy" />
          </picture>
        )}
        {/* The still is the default under reduced motion, not the only option:
            a square play chip, visible only there, swaps the poster for the
            loop on demand. CSS hides it under normal motion. */}
        {poster && !art && kind !== 'video' ? (
          <button
            type="button"
            className="plate__play"
            hidden={playing}
            aria-label={`Play the figure ${index} loop`}
            onClick={() => setPlaying(true)}
          >
            Play
          </button>
        ) : null}
      </div>
      <figcaption className="plate__slip">
        <span className="plate__slug">Fig. {index}</span>
        <span>
          {caption}
          {scope ? <em className="plate__scope"> {scope}</em> : null}
          {from ? (
            <>
              {' '}
              From <Link href={from.href}>{from.label}</Link>.
            </>
          ) : null}
        </span>
      </figcaption>
      <span className="plate__kento" aria-hidden="true" />
    </figure>
  );
}
