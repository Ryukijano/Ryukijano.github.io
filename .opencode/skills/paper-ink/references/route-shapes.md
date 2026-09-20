# The five new route shapes

Markup and rules for the sections added in September 2026. CSS lives in
`src/index.css` (paper-ink route shapes block). Nothing here needs a token
that the stylesheet does not already define.

---

## Notes — a note (`/notes/<slug>`)

The quietest sheet in the system, and the only route whose job is reading
rather than evidence. Washi, grain only, no screens, no gradation.

```html
<article class="note">
  <div class="note__kicker pi-label">
    <span>Encoding</span><span class="tick"></span><span>March 2026</span>
    <span style="margin-left:auto">Note 04</span>
  </div>
  <h1>Video is not a bag of frames</h1>
  <p class="note__standfirst">A clip carries an ordering that a set of stills
    does not, and most of the gain comes from making a model pay for
    ignoring it.</p>
  <hr>
  <div class="note__body">
    <p>…</p>
    <p>…</p>
  </div>
  <blockquote class="note__pull">If shuffling the input does not change the
    loss, the model was never using time.</blockquote>
  <div class="note__body"><p>…</p></div>
  <p class="pi-label">Scope · an argument about objectives, not a benchmark result</p>
</article>
```

- Body and standfirst both sit on `--measure-read`, so the introduction is
  never wider than what it introduces.
- The title is the claim; the standfirst is the claim in full. House style is
  to say the thing, not tease it.
- One pull-quote at most, and only for a sentence the note is built around.
  Its rule is `--color-rule`, not the seal: the scope line below carries
  evidence framing; the pull is emphasis within the argument.
- Every note carries a scope line. A note about a method says so.
- The lane in the kicker is `--color-ink-muted`, not a keyblock. It is context,
  not a label being applied.
- No hero image. Figures sit after the prose that claims them, as on a case
  study.

## Notes — index (`/notes`)

Two-line entries under year bands. Shares the band idiom with the catalogue
and differs in one way: a note entry carries a standfirst as well as a title,
because a note's title is a claim and the claim needs qualifying on the row.

```html
<div class="catalog__band"><div class="catalog__yr">2026</div>
  <a class="entry" href="/notes/video-representation">
    <div class="entry__top"><span>Video is not a bag of frames</span><em class="pi-label">Encoding</em></div>
    <div class="entry__sub">Most of the gain in video representation learning
      comes from making a model pay for ignoring order.</div>
  </a>
</div>
<p class="pi-label">Dates are publication dates. Notes are revised in place.</p>
```

- Standfirst is one sentence at `--measure-read`. If it needs two, the title
  is not doing its job.
- Chronological, newest first. Never sorted by lane — a note's argument is
  dated.
- State the dating convention under the list, the same habit as
  `Self-reported dates` on the catalogue.

## Workbench (`/tools`)

Tools rather than results: things someone can clone and run. The one surface
where a name is set in mono, because these names are typed at a prompt.

```html
<div class="tool">
  <div class="tool__name">aire-agent</div>
  <div class="tool__what">A toolkit for the Leeds AIRE cluster — shell
    wrappers over SLURM plus an MCP server, so an agent can queue and inspect
    jobs without a terminal.</div>
  <div class="tool__needs pi-label"><b>Needs</b> · AIRE account · SLURM · Python 3.11</div>
</div>
```

- The `Needs` line is the tools equivalent of a scope note, and it is the line
  that decides whether a reader can actually use the thing. Be specific: a
  cluster account, a GPU generation, an SDK version.
- One sentence on behaviour, not architecture.
- No install commands here — the link goes to the repository, where a command
  can be kept correct.
- No stars, no download counts. The system has no vanity metrics.
- Never mix a tool row and a project row in one list.

## Collection (`/collections/<slug>`)

A theme that crosses lanes, presented without becoming a fourth one. World
models and control is the first: it sits between Real world and Encoding, and
the honest presentation gathers it rather than reclassifying it.

```html
<div class="pi-label">Collection</div>
<h1>World models and control</h1>
<p>Work that sits between the lanes: predicting what happens next, and acting
   on the prediction. Each entry keeps the lane it was filed under — a
   collection gathers, it does not relabel.</p>

<div class="coll">
  <span class="coll__tick"></span>
  <div class="coll__body">
    <div>What drives success in physical planning with JEPA world models</div>
    <div class="coll__sub">Code, data and weights for the paper.</div>
  </div>
  <span class="coll__lane pi-label">Encoding</span>
</div>

<p class="pi-label">Five entries, filed across two lanes. A collection is a
  reading order, not a category.</p>
```

- Say in the lede that it gathers rather than relabels, so no reader wonders
  whether a fourth lane has appeared.
- The tick is a margin mark in `--color-rule`; the lane is named in words on
  the right. Words are what carry the distinction on the shipped palette, and
  they stay even if lane keyblocks land later.
- No keyblock, chip or screen of its own. A fourth accent is a bug.
- Every entry still has its card in its own lane. This is a second path to the
  same work, not a replacement.
- No nesting.

## Ledger (`/competitions`)

A dated table where the fourth column is the point: every row states what the
outcome rests on, in the same line as the claim.

```html
<table class="ledger">
  <tr><th class="pi-label">Year</th><th class="pi-label">Entry</th>
      <th class="pi-label">Outcome</th><th class="pi-label">Rests on</th></tr>
  <tr><td class="yr">2025</td><td>Bradford Quantum Hackathon</td>
      <td>Placed</td>
      <td class="rests">Teammate-reported; no published results table.</td></tr>
</table>
```

- Fill `Rests on` for every row, including the strong ones. A blank cell reads
  as the row with something to hide.
- Say plainly when a result is teammate-reported or unpublished. This is why
  the rest of the site is believable.
- Chronological, newest first. Never sorted by prestige.
- No accent and no keyblock. There is no state here, only record.
- A hackathon entry lives here, not also in the work catalogue.
