/**
 * Fully ported from "Case Study - Dalton Mills.dc.html".
 * Prose, figures, table and links are that file's, verbatim.
 */
import { href } from '../links.js';

const study = {
  slug: 'dalton-mills',
  status: 'full',
  source: 'Case Study - Dalton Mills.dc.html',

  year: 2024,
  lane: 'Graphics',
  desc: 'Walkable reconstruction of a burned mill from ten photographs',
  featured: true,
  featuredOrder: 5,

  breadcrumb: 'HERITAGE & XR',
  kicker: 'HELIX XR · UNIVERSITY OF LEEDS · SCIENCE MUSEUM GROUP',
  title: 'Ten photographs of a building that burned down',
  lead: 'Dalton Mills was a Grade II* listed mill in Keighley until a fire destroyed it in 2022. What survives is a handful of photographs. This is a walkable reconstruction built from ten of them — and an argument about which parts of it anyone is entitled to believe.',

  meta: [
    { k: 'YEAR', v: '2024–25' },
    { k: 'ROLE', v: 'Team of four' },
    { k: 'SUBJECT', v: 'Dalton Mills, Keighley' },
    { k: 'SOURCE DATA', v: 'Ten photographs' },
    { k: 'STACK', v: 'Unreal Engine · deep learning · VR' },
  ],

  hero: {
    src: '/assets/gifs/dalton-mills-reconstruction.gif',
    poster: '/assets/images/dalton-mills-reconstruction-poster.png',
    alt: "A mill facade rebuilt as a cloud of points. Ten camera positions sit along the base. Surfaces the photographs covered fill in one colour; the chimney's far side and the receding flank fill in another, marked as never photographed",
    caption:
      "Ten camera positions, and a facade rebuilt from them. What the photographs actually cover is one thing; the far side of the chimney and the receding flank are another. This is a schematic — camera placement and coverage are illustrative, not the project's own capture data.",
    highlight: 'schematic',
    gutter: true,
  },

  // Rendered by PullQuote; sits between sections 02 and 03 in the prototype.
  pullQuote: {
    quote:
      '“This project pushed limits on using AI techniques for historical accuracy, as AI can be inaccurate, which meant that we needed to closely stick to the records. I had to balance out creative freedom when creating 3D objects with making them as historically accurate as possible with the records we have.”',
    attribution: 'GYANATEET DUTTA · HELIX CASE STUDIES, JANUARY 2025',
  },

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'You cannot go back and take more',
      body: [
        'Photogrammetry normally means walking around a subject with a camera until you have hundreds of overlapping views. That option does not exist here. The mill is gone, the photographic record is closed, and no amount of budget or patience produces another angle. Ten usable stills is what there is.',
        "Ten views cannot determine a building. Conventional reconstruction from that little data either fails outright or produces something visibly broken — holes where surfaces should be, geometry that collapses where the cameras never looked. The project's premise was that learned models could fill those gaps convincingly. The question the rest of the work is really about is whether convincingly is the same as correctly.",
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Rebuild it, then let people walk in',
      body: 'Deep learning stands in for the scanning pass that never happened, inferring geometry from the ten stills rather than triangulating it from hundreds. The result is taken into a game engine and made walkable — not a model you orbit on a screen but a space you stand inside, reach into, and pick things up in.',
      buildList: [
        'Ten surviving stills stand in for the hundreds of overlapping views photogrammetry normally needs',
        'Learned models infer the geometry the cameras never covered, rather than leaving holes where they looked away',
        'The reconstruction is taken into Unreal Engine and built as something you stand inside, not something you orbit',
        'Hand tracking lets visitors move through the space and pick objects up, with no controller in the way',
        'Narration is delivered in a Yorkshire voice, generated rather than recorded, since no audio of the place survives',
      ],
      closing:
        'The constraint that shaped every decision was documentary rather than technical. Where the records were clear, the reconstruction follows them. Where a generative tool would happily invent a plausible detail, the work had to decide whether plausible was good enough — and mostly it was not.',
    },

    whatCameBack: {
      num: '03',
      kicker: 'WHAT CAME BACK',
      h2: 'The feedback was about access, not fidelity',
      body: 'People who tried it responded well to the experience itself. What they raised was who could get to it — which is a more useful class of criticism than praise, and it is the reason this section exists rather than a list of compliments.',
      tableHead: ['WHAT PEOPLE RAISED', 'WHY IT MATTERS'],
      tableRows: [
        {
          name: 'It needs a PC',
          cells: [
            'the experience is tethered rather than standalone, so it travels to whoever has the hardware — not to a museum floor',
          ],
        },
        {
          name: 'The controls are demanding',
          cells: [
            'visitors asked for more ways in; hand tracking is elegant and assumes a range of movement not everyone has',
          ],
        },
        {
          name: 'Younger audiences',
          cells: [
            'the group most drawn to this format is the least equipped to separate the documented parts from the inferred ones',
          ],
        },
      ],
      tableCaption:
        'All three are drawn from the feedback reported in the HELIX case study, not inferred. The tethering limitation is the one that most restricts who can experience a piece of heritage work built for the public.',
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'Half of it is a guess, and the referee is gone',
      body: [
        'Every reconstruction from sparse views invents the parts it could not see. That is not a flaw in this project; it is what the method is. What makes this case different from every other piece of generative restoration is that the subject no longer exists. A pothole can be re-photographed. A degraded scan can be recaptured. Dalton Mills cannot — so the invented surfaces can never be checked against the building, by anyone, ever.',
        "That puts a weight on the work that a technical accuracy figure does not carry. A visitor standing inside the reconstruction has no way to tell which wall came from a photograph and which came from a model's sense of what a Victorian mill looks like. Both are rendered at the same fidelity, lit the same way, equally solid under the hand. The experience is not built to distinguish them, and the honest response is to say so rather than to let immersion do the arguing.",
        "The audience question is the sharpest version of this. Younger visitors are the group most drawn to a virtual experience and least equipped to hold it at arm's length — and a confident, walkable, voiced reconstruction is a very persuasive way to transmit something that is partly inference. Flagging that as an open ethical question, rather than a solved one, is the correct position and it is where the project currently stands.",
        'There is also a plainer limit. The narration is synthesised rather than recorded — a Yorkshire voice generated to suit the setting. It is a reasonable choice for an experience with no surviving audio, and it is one more layer of the reconstruction that sounds like testimony without being any.',
      ],
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Write-up and demo',
      links: [
        {
          kind: 'WRITE-UP',
          label: 'Reconstructing Dalton Mills',
          meta: 'HELIX case study, Leeds',
          url: 'https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/',
        },
        {
          kind: 'DEMO',
          label: 'Video demonstration',
          meta: 'the experience running',
          url: 'https://youtu.be/NLTtKPMYiGY',
        },
      ],
      closing:
        'Team: Alex Neish, Gyanateet Dutta, Yuan Gao, Simon Popple. Built in the XR Development Zone at HELIX, University of Leeds, in partnership with the Science Museum Group. Published as a HELIX case study, January 2025.',
    },
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Pothole detection',
      to: href('Case Study - Pothole Detection.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Cosmos Sentinel',
      to: href('Case Study - Cosmos Sentinel.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;
