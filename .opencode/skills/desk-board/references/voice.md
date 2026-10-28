# Writing on the desk

Contents: the voice, captions, scope lines, the note, the nameplate, the bio,
numbers, words to refuse, a pre-flight list.

Voice in one line: a person saying what they did and how far it goes. Plain,
specific, a little dry. British English (`recognise`, `learnt`, `colour`),
first person, curly quotes and apostrophes as the data files use them.

For longer prose, read `src/content/notes/beige-pc.md` and
`src/content/cuda-blackwell-labs.md` first; they are the register.

## The rule behind all of it

Every claim carries its scope in the next sentence. The scope says what the
claim rests on and where it stops. From the repo:

> It reports 89.5% accuracy on the patient test set and 90.0% on the porcine
> test set. Both are accuracies on the paper's own test sets for one
> procedure, and neither says how the model would do in an operating theatre.
> (`src/content/notes/beige-pc.md`)

> The paper's abstract puts its DINOv2 model at fourteen times fewer
> parameters than foundation models such as V-JEPA2. That is a parameter
> count, not a speed measurement. (same note)

The desk is smaller than a note, so the scope is often a few words in the
caption slip or the mono scope line. It is still there.

## Captions

Italic serif, under the picture, in `.board__caption`. Two kinds:

- **A pointer** is a lowercase fragment, no full stop, for a picture that
  links somewhere: `where it started`, `the other deck`. It names the thing.
- **A claim** is a sentence with a full stop, for a picture that shows
  something: `A schematic of one wave, from woodblock print through RGB
  pixels to wireframe.` One word that qualifies it is marked with
  `highlight: 'schematic'` in `src/data/plate.js`, which renders in the seal
  (`.folio__mark`). The highlight must be a substring of the caption, or it
  silently renders unmarked.

Do: say what the picture is, then stop.
Don't: say how it should feel, or how good it is.

| do | don't |
|---|---|
| `where it started` | `Little me, already obsessed with tech!` |
| `A schematic of one wave, ...` | `A beautiful wave in three forms` |

`alt` text is a different job: describe the picture for someone who cannot
see it, as in `Gyanateet as a child, at a beige desktop computer`.

## Scope lines

Mono, muted, `.board__scope`. One or two short sentences naming what the
thing is not. Say *not a photograph*, *not a result*, *not a capture*, *not a
measurement* - whichever a reader could otherwise assume.

Real ones to copy the shape of:

- `A pixel drawing. Not a photograph, and not a result.` (`board.js`)
- `Generated illustration. Not a capture from the B3tt3r repository.`
  (`portfolio.js`)
- `Evaluated on simulated pick-and-place data.` (Gemma-Le, `portfolio.js`)
- `Self-reported dates`, `Unreviewed preprint`, `Teammate-reported`: labels
  for anything a reader might over-trust.

Don't write `Illustrative only!` or a disclaimer in a footnote. The scope
sits next to the claim, in the same register.

## The note ("On my mind")

A short list of what is actually on my mind, three lines, each already stated
somewhere on the site and each a link to the page that states it. The
provenance is in the comment at the top of `src/data/board.js`:

| line | rests on |
|---|---|
| Self-supervised vision | the ISBI paper's own description; links to the AIMS case study |
| Quantum algorithms | the Ryoushi subtitle; links to Ryoushi |
| Image-based 3D reconstruction | `RESEARCH_INTERESTS` in `src/data/publications.js`, word for word; links to B3tt3r |

To add a line: first find the sentence in `src/data` or `src/content` that
supports it, link to that page, and put the source in the `board.js`
comment. If there is none, the line does not ship.

**"Robot learning" is not on the note.** Nothing in `src/data` calls the work
that, and `DESIGN.md` records the omission as deliberate. Do not add it, or
`embodied AI`, `general-purpose agents`, `foundation models for X`, or any
field the site's own pages do not name. The rule is the source, not the
fashion.

Lines are noun phrases, sentence case, no full stop, no emoji, no bullet
character in the text (the square bullet is CSS).

## The nameplate

`Gyanateet Dutta`, then `Ryukijano` in italic, then the three subjects. Each
subject is a link to a route that exists. `Vision` goes to the vision lane,
`quantum` to Ryoushi, `robotics` to Gemma-Le, the one project tagged
Robotics. There is no robotics lane, and the page does not imply one. The
list reads `Vision, quantum & robotics`; keep the join logic in the
component, not in the data string.

## The bio

`HOME_BIO.statement` in `src/data/publications.js`. First person, three
sentences, plain:

> That’s me at the beige PC. Games and graphics got me into computers, and I
> never got out. I keep coming back to video: whether a model can recognise
> the phase of an operation, or guess what comes next. The hands-on side
> stays: CUDA, simulation and quantum circuits.

Rules:

- `HOME_BIO.story.text` must appear verbatim inside the statement; the
  component links that span to `/notes/beige-pc` by string match, and if the
  match fails the link vanishes without an error. Check the link renders.
- It states interests, not achievements. A claim of achievement goes to a
  case study with its scope.
- It must agree with `src/content/notes/beige-pc.md`. If the note changes,
  read the bio again.

## The label

`open source ftw`, lowercase, verbatim, a link to the GitHub profile. It is the
owner's wording; do not capitalise it, expand it or add an exclamation mark.
It is not a seal and not a pill.

## Numbers

None on the desk. If one is ever added: it must be traceable to a paper,
write-up or repository the site links, its scope must follow in the next
sentence, and years and measurements are `tabular-nums` in mono. No follower
counts, stars, download counts or "years of experience".

## Refuse these

| refuse | why |
|---|---|
| `robot learning`, unless `src/data` says so | unsupported by the data; deliberate omission |
| passionate, cutting-edge, state-of-the-art, revolutionary, game-changing, leverage, unlock, journey | hype; the site shows rather than sells |
| `I'm a world-class ...`, `expert in ...` | a claim with no scope |
| a number with no source or scope | does not ship |
| emoji, kaomoji, `!!`, `ftw` anywhere except the label | the site is quiet |
| a new lane, persona or field name invented for the desk | the desk reflects the site; it does not extend it |
| a claim about a result on the desk | results live in case studies, with their scope |

If the request needs one of these, say what the site does support and offer
that. Do not quietly soften it into something unsourced.

## Before you finish writing

- [ ] British spelling, first person, curly apostrophes.
- [ ] Every claim has its scope next to it.
- [ ] Every number has a source in the repo or a linked page.
- [ ] Every link goes to a route that exists (`npm run build`, then `npm test`).
- [ ] Nothing here says something its target page does not.
- [ ] No hype word, no emoji, no `robot learning`.
