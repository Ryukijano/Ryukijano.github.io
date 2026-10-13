import { Fragment } from 'react';
import SiteNav from '../components/SiteNav';
import { BOARD } from '../data/board';
import Link from '../lib/Link';

export default function HomePage() {
  const { started, deck, mind, mark } = BOARD;

  return (
    <div className="board">
      <SiteNav overlay hideWordmark />

      <main id="main" tabIndex={-1} className="route board__stage">
        <header className="board__card board__name plate--pinned">
          <span className="plate__tape" aria-hidden="true" />
          <h1>{BOARD.name}</h1>
          <p className="board__byline">
            <Link className="board__handle" href={BOARD.handle.href}>
              {BOARD.handle.text}
            </Link>
            <span className="board__sep" aria-hidden="true" />
            <span className="board__subjects">
              {BOARD.subjects.map((subject, index) => (
                <Fragment key={subject.href}>
                  {index > 0 ? (index === BOARD.subjects.length - 1 ? ' & ' : ', ') : null}
                  <Link href={subject.href}>{subject.text}</Link>
                </Fragment>
              ))}
            </span>
          </p>
        </header>

        <Link href={started.href} className="board__card board__print board__print--started plate--pinned plate--flip">
          <span className="plate__tape" aria-hidden="true" />
          <img
            src={started.src}
            alt={started.alt}
            width={started.width}
            height={started.height}
            fetchPriority="high"
            decoding="async"
          />
          <span className="board__caption">{started.caption}</span>
        </Link>

        <figure className="board__card board__print board__print--deck plate--pinned">
          <span className="plate__tape" aria-hidden="true" />
          <div
            className="study-art"
            style={{ '--deck-ratio': `${deck.width} / ${deck.height}` }}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: deck.art }}
          />
          <figcaption>
            <p className="board__caption">{deck.caption}</p>
            <p className="board__scope">{deck.scope}</p>
          </figcaption>
        </figure>

        <section className="board__card board__note plate--pinned plate--flip" aria-labelledby="board-mind">
          <span className="plate__tape" aria-hidden="true" />
          <h2 id="board-mind" className="board__note-title">
            {mind.title}
          </h2>
          <ul role="list" className="board__mind">
            {mind.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </section>

        <a className="board__mark" href={mark.href} target="_blank" rel="noopener noreferrer">
          {mark.text}
        </a>
      </main>
    </div>
  );
}
