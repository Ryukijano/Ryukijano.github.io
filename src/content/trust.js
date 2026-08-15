/**
 * Extracted from "Index - What We Trust.dc.html" — the header, the confidence
 * ramp, the four provenance bands with their project cards, and the closing
 * doors. Prose, figures and link targets are that file's, verbatim.
 */
import { href } from './links.js';

export const bandIds = ['measured', 'restored', 'inferred', 'invented'];

const trust = {
  kicker: 'A SECOND WAY THROUGH THE SAME ELEVEN PROJECTS',
  h1: 'what we trust',
  lead: 'eleven projects, sorted by a question that has nothing to do with what any of them are about. how much of what a system reports was recorded by something, and how much was supplied by a model.',
  lead2: 'the persona split — graphics, vision, quantum — is a map of subject matter. this is the other axis. a mill rebuilt from photographs and a crash that never occurred have almost nothing in common technically, and they land in the same band here, because neither one can be checked against anything. that turns out to be the more useful thing to know about them.',

  rampGloss: [
    'a sensor recorded it',
    'a model put back what was lost',
    'no sensor saw it, but it’s out there',
    'nothing to check it against',
  ],

  framing: {
    h2: 'why sort them this way',
    body: [
      'every project here produces something that looks like a fact. a phase label, an energy, a bounding box, a wall. they don’t all deserve the same amount of belief, and nothing in the output says which is which — a super-resolved pothole comes back at the same resolution as a photographed one, lit the same way, in the same file, with no marker on the invented pixels.',
      'so the bands below are about provenance rather than quality. a measured result can still be wrong. an invented one can still be the best thing on the site. what changes as you go down is what you’d have to do to catch a mistake, and by the last band the answer is that you can’t.',
    ],
    quiet: 'the ordering is deliberate. it gets worse.',
  },

  bands: [
    {
      id: 'measured',
      name: 'MEASURED',
      def: 'the output corresponds to something a sensor recorded. you could go back and check it.',
      test: 'THE TEST — there’s a frame, a shot count or a machine somewhere that someone could pull up and compare against.',
      note: 'the strongest case in this band is also the smallest. shor’s hands you two factors and you can verify them by multiplying — no other project here can be checked without trusting the thing that produced it. the weakest is syndrome-net, which measures its own provenance rigorously and doesn’t claim a physics result at all. so measured covers quite a range, and it matters which end of it a given number sits at.',
      cards: [
        {
          t: 'surgical phase recognition',
          m: 'vision · isbi 2026 · frozen dinov2 and v-jepa2 encoders',
          o: 'a phase label for every frame of an endoscopic submucosal dissection. real frames, and labels a clinician wrote.',
          b: 'the procedure in front of it resembles the one it trained on. porcine → human costs the 4-stage head 12.5 points and the 8-stage head 17.0 — the gap widens as the head gets bigger, which is the wrong direction and took a while to believe. the label is a claim about a domain the model didn’t train on.',
          to: href('Case Study - Surgical Phase Detection.dc.html'),
        },
        {
          t: 'syndrome-net',
          m: 'quantum · stim · five code families · the page that argues for all of this',
          o: 'decoder performance across surface, colour, qldpc and bosonic codes — and a note on every result naming the machine that produced it.',
          b: 'you read it as a claim about provenance. the numbers come out of simulation, not a quantum computer, and the threshold sweeps that would decide whether any of these codes are worth building haven’t been published. what’s rigorously measured here is which accelerator ran the job. that sounds like a small thing. it’s the reason anything else on this site can be argued with six months later.',
          to: href('Case Study - Syndrome-Net.dc.html'),
        },
        {
          t: 'conditional-gqe',
          m: 'quantum · gic 2026 · chemical accuracy is 1.6 mHa',
          o: 'a circuit shape proposed per molecule, and the energy that circuit gives you.',
          b: 'the system is small enough. under roughly twenty-eight qubits the reference is exact and the answer can be checked outright. past that the memory runs out, the reference becomes an approximation, and exact quietly starts meaning exact within the simplified model. the hardware runs prove the circuit executed cleanly. they say nothing about whether the energy was right.',
          to: href('Case Study - Conditional GQE.dc.html'),
        },
        {
          t: 'nqcc rolls-royce challenge',
          m: 'quantum · nqcc uk 2025 · 4 qubits run, 127+ designed on paper',
          o: 'adsorption energies for hydrogen on nickel, diagonalised in the subspace a real device actually sampled.',
          b: 'you accept dft as the referee. sqd found −2.15 eV at the fcc site against a dft reference of −2.20 eV, under 5% error, at a depth below 100 gates. the awkward part is that the reference is itself a calculation with a functional someone chose — and the choice of functional changing the answer was the whole argument for putting the problem on a quantum device in the first place.',
          to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
        },
        {
          t: 'generalised shor’s algorithm',
          m: 'quantum · yquantum 2025, yale · 1st',
          o: 'the factors of a number.',
          b: 'you can multiply. 15 = 3 × 5, from a phase register of 8 qubits, a target of 4 and 9 ancillas, over 2048 shots, with every gate in the modular arithmetic built up by hand from h, cx, cp, t and swap. the check takes seconds and doesn’t involve trusting anything. the honest boundary is where it stopped — n=143 wanted 41 qubits and the backend refused on account permissions, which isn’t a computational failure and the page says so.',
          to: href('Case Study - YQuantum Shors Algorithm.dc.html'),
        },
      ],
    },
    {
      id: 'restored',
      name: 'RESTORED',
      def: 'a model filled in detail that was lost but did once exist. checkable in principle, as long as somebody kept the original.',
      test: 'THE TEST — find the frame from before it was degraded and put the two side by side.',
      note: 'one project, and that isn’t an accident. restoration in the strict sense needs a before, and most of what gets called restoration hasn’t got one. the paper’s own limits section puts it better than i can: a false pothole that survives both stages looks exactly like a true one downstream. the detector has no way to tell which pixels the generator made up. neither has anyone reading the output.',
      cards: [
        {
          t: 'pothole detection',
          m: 'published · arxiv:2401.08588 · esrgan in front of yolov7',
          o: 'boxes drawn on road defects — on asphalt grain that a gan put there, on a frame that no longer contained it.',
          b: 'you’re still in the lab. the paper degrades its own 800p capture down to 360p and restores it ×4, so the original does exist and the invention is checkable against it. mAP goes 0.73 → 0.85 on yolov7x and inference goes 53 ms → 69 ms, because the generator forward pass isn’t free. point the same pipeline at a live dashcam and there was never an original. the band changes underneath it and nothing in the output announces that.',
          to: href('Case Study - Pothole Detection.dc.html'),
        },
      ],
    },
    {
      id: 'inferred',
      name: 'INFERRED',
      def: 'the model asserts something no sensor observed. the thing it’s talking about still exists, so someone could in principle go and settle it.',
      test: 'THE TEST — wait, or go and look. the answer is out there. it just isn’t in the file.',
      note: 'the difference between this band and the next one is whether anyone could settle it, not whether anyone will. in practice the tracking case never gets settled — the frames where the answer matters are exactly the frames no human can supply it for, which is uncomfortably close to unfalsifiable in effect if not in principle. that’s the boundary this whole page is really about.',
      cards: [
        {
          t: 'fet-vae frame prediction',
          m: 'msc thesis, leeds · jigsaws suturing · 22 fps',
          o: 'the next twenty frames of a suture, before they’ve happened.',
          b: 'you wait twenty frames. this is the cleanest case anywhere on the site — the ground truth turns up on its own, on a schedule, and the comparison runs itself. 28.13 dB psnr, 0.927 ssim and 0.062 lpips at t=20. the write-up also flags that a separate record reports the result as +2.36 dB over a baseline, and declines to merge the two figures without the baseline in front of it.',
          to: href('Case Study - FET-VAE Surgical Prediction.dc.html'),
        },
        {
          t: 'got-jepa tool tracking',
          m: 'vision · in progress · the tracking scores on that page are targets, not results',
          o: 'an instrument’s identity carried through the frames where cautery smoke has taken the view.',
          b: 'somebody who was in the room agrees with it. the grasper really is there, so there’s a fact of the matter — but nobody labelled those frames, for the obvious reason that an annotator watching that footage can’t tell either. ten surgeries labelled, seventy-three not, and the hard frames missing from both. the smoke it trains against is drawn by a function rather than produced by a cautery, and whether that transfers is an assumption.',
          to: href('Case Study - GOT-JEPA Tool Tracking.dc.html'),
        },
        {
          t: 'gemma-le / gemma-groot',
          m: 'robotics · siglip + gemma 3 + scaledp · 3× l40',
          o: 'eight control steps at a time, denoised out of noise by a diffusion head over 50 steps.',
          b: 'you run the arm. an action chunk is a claim about what should happen next, and it gets settled by letting the robot move — the same shape as predicting frames, with a motor on the end of it. there’s no success rate on that page and that’s deliberate; the useful artefact is a policy small enough that someone else can retrain it on their own hardware in an afternoon.',
          to: href('Case Study - Gemma-Le VLA.dc.html'),
        },
      ],
    },
    {
      id: 'invented',
      name: 'INVENTED',
      def: 'the output depicts something that never happened, or that no longer exists to check against. unfalsifiable by construction.',
      test: 'THE TEST — there isn’t one. that’s the definition, not a complaint about the work.',
      note: 'these two are why the page exists. dalton mills is the sharpest version of the problem anywhere here and it’s also the best thing on the site. the band describes what you’re allowed to do with the output afterwards. put a generated near-miss in front of an insurer and it stops being a hypothesis. put a walkable mill in front of a fourteen-year-old and it stops being a reconstruction.',
      cards: [
        {
          t: 'dalton mills',
          m: 'helix xr · science museum group · the narration is generated too',
          o: 'a walkable victorian mill, inferred from ten photographs of a grade II* building that burned down in 2022.',
          b: 'nothing. there is no version of this where anyone finds out. the mill is gone, the photographic record is closed, and the surfaces the ten cameras never covered can’t be compared against the building by anyone, ever. a visitor standing inside has no way to tell which wall came from a photograph and which came from a model’s sense of what a mill looks like. both are lit the same and equally solid under the hand.',
          to: href('Case Study - Dalton Mills.dc.html'),
        },
        {
          t: 'cosmos sentinel',
          m: 'video · world models · the public demo runs two of the three stages',
          o: 'video of a collision that didn’t occur, generated from a clip where one nearly did.',
          b: 'you treat it as an illustration and say so out loud. nothing in the chain knows how heavy the car was, how wet the road was, or how fast that particular driver would have reacted, and it comes back looking like footage. none of it has been measured — no test set, no accuracy figure, nothing held back. and the three stages can’t check each other, because the second and third only ever see what the first picked out. when they agree, that’s inheritance.',
          to: href('Case Study - Cosmos Sentinel.dc.html'),
        },
      ],
    },
  ],

  closing: {
    h2: 'the other axis',
    body: [
      'the same eleven, sorted by subject instead, are on the work page. the personas are the better map if you want to know what someone spends their week doing. this one’s the better map if you want to know what to believe.',
      'if you think something sits in the wrong band, i’d like to hear it. the line between restored and invented moves depending on whether you’re describing the experiment or the deployment, and i’ve put pothole detection on the experiment side, which is the generous reading of it.',
    ],
    doors: [
      { kick: 'BY SUBJECT', title: 'all eleven, sorted the usual way', to: href('Revamp E - Method Transfer.dc.html') },
      { kick: 'Index', title: 'the three personas', to: href('Intro.dc.html') },
      { kick: 'PAPERS, CODE, PLACEMENTS', title: 'the academic page', to: href('Academic.dc.html') },
    ],
    foot: 'eleven projects. five you could check, one you could check if you kept the original, three you’d have to wait for, and two that nobody is ever going to check.',
  },
};

export default trust;
