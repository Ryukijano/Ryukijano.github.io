/** Extracted from "Academic.dc.html". Lower-case copy is the source's own. */
import { href } from './links.js';

export const rail = {
  name: 'Gyanateet Dutta',
  line: 'surgical video, quantum circuits, and rebuilding things that aren’t there any more',
  meta: ['msc advanced computer science', 'university of leeds', 'leeds, uk'],
};

export const nav = [
  { label: 'about', href: '#about' },
  { label: 'research', href: '#research' },
  { label: 'how i got here', href: '#timeline' },
  { label: 'selected work', href: '#work' },
  { label: 'papers', href: '#papers' },
  { label: 'software & releases', href: '#software' },
  { label: 'competitions', href: '#competitions' },
  { label: 'where the work happens', href: '#where' },
  { label: 'learning in public', href: '#public' },
  { label: 'misc, unsorted', href: '#misc' },
  { label: 'contact', href: '#contact' },
];

export const links = [
  { label: 'github', href: 'https://github.com/Ryukijano' },
  { label: 'hugging face', href: 'https://huggingface.co/Ryukijano' },
  { label: 'orcid', href: 'https://orcid.org/0009-0008-0480-9241' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/gyanateet-dutta-386215192/' },
  { label: 'w&b', href: 'https://wandb.ai/ryukijano' },
  { label: 'quantum buddies', href: 'https://github.com/Quantum-Buddies' },
];

export const themes = [
  {
    n: '01',
    t: 'video where you can’t see',
    b: 'endoscopic video is the hardest footage i’ve worked with. one camera, no second angle, and the view goes when the cautery fires or something bleeds. usually right as the interesting thing happens. i work on encoders that hold a steady read on an instrument through those frames, trained without labels, since those are the frames a human annotator can’t call either.',
    e: 'where it gives out: deeper temporal models transfer worse across species. the extra capacity learns the rhythm of the training procedure and carries it over.',
  },
  {
    n: '02',
    t: 'filling in gaps, and what that entitles you to say',
    b: 'super-resolution ahead of detection. buildings rebuilt from a handful of photos. world models rolling a scene into a future that didn’t happen. all of it fills gaps convincingly, and looking right was never the hard part. the question is whether anything downstream can separate what got filled in from what was recorded. mostly it can’t, and i think that matters more than it gets credited for.',
    e: 'worst case i’ve run into: the building burned down. there is nothing left to check the reconstruction against.',
  },
  {
    n: '03',
    t: 'circuits designed by a model, benchmarks that name their hardware',
    b: 'choosing a circuit shape is still a person guessing, once per molecule. you can amortise that into a model conditioned on the molecule, and it turns out to be mostly a reinforcement-learning problem with one nasty failure mode — the policy finds operations that are perfectly legal and change nothing, then sits there. i also spend more time than is probably normal on benchmarks that record which machine produced them.',
    e: 'accelerators fail silently and the job finishes anyway. a timing you can’t trace back to hardware isn’t worth much.',
  },
];

export const timeline = [
  {
    y: '2026',
    b: 'circuit design with a transformer, for the mitsubishi chemical and aist challenge, with quantum buddies. the surgical phase work went to isbi. started on a tracker that has to keep hold of instruments through cautery smoke. that one’s still mid-build and the write-up says so.',
  },
  {
    y: '2025',
    b: 'rebuilt dalton mills, a keighley mill that burned down in 2022, from ten surviving photographs. helix xr at leeds, with the science museum group. four quantum hackathons in one year — yale, bradford, london, and the nqcc rolls-royce challenge. finished the msc thesis on predicting surgical video a few frames out.',
  },
  {
    y: '2024',
    b: 'msc at leeds. started with the aims group on self-supervised encoders for surgical workflow, working with leeds teaching hospitals. everything since has come out of that. the pothole paper went up on arxiv in january.',
  },
  {
    y: '2023',
    b: 'eighth globally in the hugging face jax diffusers sprint, training controlnet on tpu v4. aws ai/ml scholar, top 15% on deepracer. mostly a year of learning frameworks by breaking them.',
  },
  {
    y: '2022',
    b: 'first paper. travelling salesman with hopfield networks against simulated annealing, sole author. first time i got a result i didn’t like and left it in.',
  },
  { y: '2005', b: 'got a computer. haven’t really left it since.' },
];

export const work = [
  {
    t: 'Conditional-GQE',
    d: 'a transformer that picks the circuit shape. there’s a working four-qubit simulator on the page, so you can run the argument yourself instead of believing me.',
    m: 'quantum · gic 2026 · live widget',
    to: href('Case Study - Conditional GQE.dc.html'),
  },
  {
    t: 'Dalton Mills',
    d: 'ten photographs of a building that no longer exists. some of the reconstruction is guesswork and there’s no way left to find out which parts.',
    m: 'graphics · helix xr · science museum group',
    to: href('Case Study - Dalton Mills.dc.html'),
  },
  {
    t: 'Surgical phase recognition',
    d: 'frozen encoders and a 0.099m-parameter head. the domain gap gets wider when you make the head bigger, which took a while to believe.',
    m: 'vision · isbi 2026',
    to: href('Case Study - Surgical Phase Detection.dc.html'),
  },
  {
    t: 'Syndrome-Net',
    d: 'error correction across surface, colour, qldpc and bosonic codes. every result carries a note saying which machine actually produced it.',
    m: 'quantum · stim · reinforcement learning',
    to: href('Case Study - Syndrome-Net.dc.html'),
  },
  {
    t: 'Cosmos Sentinel',
    d: 'three models on a dashcam clip. the last one generates a crash that never happened, which is the part people will believe.',
    m: 'video · world models · zerogpu',
    to: href('Case Study - Cosmos Sentinel.dc.html'),
  },
  {
    t: 'GOT-JEPA tool tracking',
    d: 'teaching a tracker that the instrument is still there once the smoke rolls in. in progress. the page lists what collapsed as well as what ran.',
    m: 'vision · in progress',
    to: href('Case Study - GOT-JEPA Tool Tracking.dc.html'),
  },
  {
    t: 'FET-VAE frame prediction',
    d: 'predicting surgical video a few frames out. fast enough to matter in theatre, not only in a paper.',
    m: 'msc thesis · +2.36 db psnr · 22 fps',
    to: href('Case Study - FET-VAE Surgical Prediction.dc.html'),
  },
  {
    t: 'Pothole detection',
    d: 'super-resolution before detection instead of after. accuracy goes up in every variant. so does latency, and the page says so.',
    m: 'published · arxiv:2401.08588',
    to: href('Case Study - Pothole Detection.dc.html'),
  },
  {
    t: 'Gemma-Le / Gemma-GR00T',
    d: 'a small vision-language-action policy for manipulation. small enough to actually run on something.',
    m: 'robotics · siglip + gemma 3 + scaledp',
    to: href('Case Study - Gemma-Le VLA.dc.html'),
  },
  {
    t: 'NQCC Rolls-Royce challenge',
    d: 'vqe and sqd on a rolls-royce problem. the claim is that the ansatz converges. nothing stronger than that.',
    m: 'quantum · nqcc uk · team 15',
    to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
  },
  {
    t: 'Generalised Shor’s algorithm',
    d: 'first at yquantum, yale. extends the textbook factoring routine past the case everyone implements.',
    m: 'quantum · yquantum 2025 · 1st',
    to: href('Case Study - YQuantum Shors Algorithm.dc.html'),
  },
];

export const papers = [
  {
    t: 'A self-supervised vision transformer for surgical phase recognition',
    d: 'frozen dinov2 vit-s/14 and v-jepa2 vit-l encoders, with a 0.099m-parameter temporal head trained on top. the move to self-supervised temporal encoders is the point of it.',
    m: 'ISBI 2026 · 90.0% porcine, 89.5% human · 25 ms on an NVIDIA A2',
    to: href('Case Study - Surgical Phase Detection.dc.html'),
    internal: true,
  },
  {
    t: 'Improved Pothole Detection Using YOLOv7 and ESRGAN',
    d: 'super-resolution as a preprocessing stage instead of a cleanup pass, so a cheap camera behaves a bit more like an expensive one.',
    m: 'arXiv:2401.08588 · Rout, Dutta, Sinha, Dey, Mukherjee, Gupta · 2024',
    to: href('Case Study - Pothole Detection.dc.html'),
    internal: true,
  },
  {
    t: 'Solving the Travelling Salesmen Problem using HNN and HNN-SA algorithms',
    d: 'hopfield networks against simulated annealing on a classical optimisation benchmark.',
    m: 'arXiv:2202.13746 · sole author · 2022',
    to: 'https://arxiv.org/abs/2202.13746',
    internal: false,
  },
  {
    t: 'Future frame prediction for robotic surgery',
    d: 'a vae-transformer hybrid predicting surgical video a few frames out, at a frame rate that keeps it usable.',
    m: 'MSc thesis, University of Leeds · +2.36 dB PSNR at 22 FPS',
    to: href('Case Study - FET-VAE Surgical Prediction.dc.html'),
    internal: true,
  },
];

export const software = [
  {
    k: 'CODE',
    n: 'syndrome-net',
    d: 'qec simulation, decoding and rl control across five code families',
    s: '',
    href: 'https://github.com/Ryukijano/syndrome-net',
  },
  {
    k: 'CODE',
    n: 'Conditional_GQE',
    d: 'generative quantum circuit design, validated on qpu hardware',
    s: '',
    href: 'https://github.com/Quantum-Buddies/Conditional_GQE',
  },
  {
    k: 'CODE',
    n: 'quantumforge',
    d: 'rust/pyo3 kernels for quantum compilation and benchmarking',
    s: '',
    href: 'https://github.com/Ryukijano/quantumforge',
  },
  {
    k: 'CODE',
    n: 'Gyanateet_tracking',
    d: 'four-stage surgical tool tracking with object permanence',
    s: '',
    href: 'https://github.com/Ryukijano/Gyanateet_tracking',
  },
  {
    k: 'CODE',
    n: 'ESRGAN_AND_YOLOV7',
    d: 'implementation for the pothole paper',
    s: '4 stars',
    href: 'https://github.com/Ryukijano/ESRGAN_AND_YOLOV7',
  },
  {
    k: 'CODE',
    n: 'B3tt3r',
    d: 'mast3r and spann3r combined for 3d reconstruction',
    s: '3 stars',
    href: 'https://github.com/Ryukijano/B3tt3r',
  },
  {
    k: 'DATA',
    n: 'Pothole-detection-Yolov8',
    d: 'annotated pothole dataset released with the paper',
    s: '307 downloads',
    href: 'https://huggingface.co/datasets/Ryukijano/Pothole-detection-Yolov8',
  },
  {
    k: 'MODEL',
    n: 'h-cgqe-gic2026',
    d: 'trained weights for the conditional circuit-design model',
    s: '',
    href: 'https://huggingface.co/Ryukijano/h-cgqe-gic2026',
  },
  {
    k: 'MODEL',
    n: 'CatCon-ControlNet',
    d: 'controlnet trained on tpu v4 for the jax diffusers sprint',
    s: '6 likes',
    href: 'https://huggingface.co/Ryukijano/CatCon-Controlnet-WD-1-5-b2R',
  },
];

export const competitions = [
  { p: '1st', n: 'YQuantum, Yale — generalised Shor’s algorithm', y: '2025' },
  { p: 'Grand Prix', n: 'Bradford Quantum Hackathon — and 1st, Medicine track', y: '2025' },
  { p: 'Finalist', n: 'City of London Quantum Hackathon', y: '2025' },
  { p: 'Team 15', n: 'NQCC UK Quantum Hackathon — Rolls-Royce challenge', y: '2025' },
  { p: 'Entrant', n: 'GIC — Mitsubishi Chemical Group & AIST', y: '2026' },
  { p: '8th', n: 'Hugging Face JAX Diffusers sprint, global', y: '2023' },
  { p: 'Top 15%', n: 'AWS DeepRacer, as an AWS AI/ML Scholar', y: '2023' },
];

export const places = [
  {
    n: 'AIMS group, University of Leeds',
    d: 'ai in medical systems. surgical workflow research, with leeds teaching hospitals nhs trust',
  },
  {
    n: 'HELIX XR, University of Leeds',
    d: 'the xr development zone where the heritage work gets built',
  },
  { n: 'Science Museum Group', d: 'partner on the dalton mills reconstruction' },
  {
    n: 'Quantum Buddies',
    d: 'co-founder. circuit design, error correction, and a lot of hackathons',
  },
  { n: 'London Quantum Group', d: 'community membership' },
];

export const misc = [
  'i stream sometimes, and there’s a youtube channel with graphics experiments that never made it into anything.',
  'there’s a soundcloud set linked on the front page. unrelated to any of this. staying up.',
  'hokusai’s wave is on the site because it’s a better picture of a fluid than most simulations, and he got there a century before the equations did.',
  'i keep picking up languages i don’t need. rust, mojo. being bad at something new is good for you.',
  'gamer before programmer, which is why i knew what a frame budget was years before i knew what big-o meant.',
  'a lot of this traces back to that. latency shapes which ideas are even worth trying.',
  'best thing i’ve learned so far: a metric reading exactly zero is almost never good news.',
];

export const prose = {
  research:
    'if a model fills in something the sensor never saw, can anyone tell afterwards? usually not. the invented pixels come out at the same resolution as the real ones, lit the same way, and nothing in the file marks which is which. i keep hitting this from different directions, so most of what follows is a version of it.',
  workSub:
    'written up properly. each one has a section on what it can’t do, and any figure that’s a schematic says so on the figure.',
  softwareSub:
    'code and artifacts other people can pick up and run. the counts are whatever the platform said the day i wrote this.',
  competitionsSub:
    'these are placements, not peer review, which is why they’re in their own section. hackathons are also the quickest way i’ve found to learn where a method gives out. there’s no room to hide a bad ansatz behind a long timeline.',
  publicInPublic: [
    'i pick up frameworks by pushing them past what they’re for and writing down what broke. the cuda and quantum kernel repos are practice logs, not products. rust and mojo are me being deliberately bad at something. there are about a hundred repositories and they vary a lot in seriousness, which is on purpose — a record of what i didn’t know yet is more use to me than a tidy one.',
    'same instinct in the write-ups. one training run collapsed at step 29k. another reported a validation error of exactly zero for its whole duration before anyone spotted what that meant. both are on the page, because a portfolio where everything worked isn’t much of a record.',
  ],
  contact:
    'if you work on surgical video, learned circuit design, or the general problem of telling measurement from inference, i’d like to hear from you. also fine to tell me something here is wrong.',
  foot: 'built by hand. the diagrams are drawn, not screenshotted, and if a figure is a schematic it says so.',
};

export default {
  rail,
  nav,
  links,
  themes,
  timeline,
  work,
  papers,
  software,
  competitions,
  places,
  misc,
  prose,
};
