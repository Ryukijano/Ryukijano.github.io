export const PUBLICATIONS = [
  {
    title: 'Pothole Detection Using YOLOv7 and ESRGAN for Enhanced Image Resolution',
    authors: ['G. Dutta'],
    venue: 'arXiv preprint',
    year: 2024,
    type: 'preprint',
    arxiv: '2401.08588',
    doi: null,
    pdfUrl: 'https://arxiv.org/abs/2401.08588',
    codeUrl: null,
    tags: ['Computer Vision', 'YOLOv7', 'ESRGAN'],
    note: '94.7% precision, 82.6% recall without LIDAR.',
    bibtex: `@article{dutta2024pothole,
  title={Pothole Detection Using YOLOv7 and ESRGAN for Enhanced Image Resolution},
  author={Dutta, Gyanateet},
  journal={arXiv preprint arXiv:2401.08588},
  year={2024}
}`,
  },
  {
    title: 'A Comparative Study of Hopfield Neural Networks and Simulated Annealing for the Travelling Salesman Problem',
    authors: ['G. Dutta'],
    venue: 'arXiv preprint',
    year: 2022,
    type: 'preprint',
    arxiv: '2202.13746',
    doi: null,
    pdfUrl: 'https://arxiv.org/abs/2202.13746',
    codeUrl: null,
    tags: ['Optimization', 'Hopfield Networks', 'TSP'],
    note: 'Classical optimization baseline for later quantum work.',
    bibtex: `@article{dutta2022hopfield,
  title={A Comparative Study of Hopfield Neural Networks and Simulated Annealing for the Travelling Salesman Problem},
  author={Dutta, Gyanateet},
  journal={arXiv preprint arXiv:2202.13746},
  year={2022}
}`,
  },
  {
    title: 'Surgical Video Prediction with a VAE–Transformer Hybrid',
    authors: ['G. Dutta'],
    venue: 'MSc thesis, University of Leeds',
    year: 2025,
    type: 'thesis',
    arxiv: null,
    doi: null,
    pdfUrl: null,
    codeUrl: 'https://github.com/Ryukijano/vae-surgical-prediction',
    tags: ['VAE', 'Transformer', 'Medical AI'],
    note: '+2.36 dB PSNR over baselines; 22 FPS mixed-precision inference.',
    bibtex: `@mastersthesis{dutta2025surgical,
  title={Surgical Video Prediction with a VAE--Transformer Hybrid},
  author={Dutta, Gyanateet},
  school={University of Leeds},
  year={2025}
}`,
  },
];

export const RESEARCH_TIMELINE = [
  {
    year: 2026,
    title: 'MSc Thesis: Surgical Video Prediction',
    org: 'University of Leeds',
    desc: 'VAE–Transformer hybrid architecture, +2.36 dB PSNR improvement over baselines, real-time inference at 22 FPS.',
  },
  {
    year: 2025,
    title: 'AIMS Research Intern',
    org: 'Leeds Teaching Hospitals NHS Trust / University of Leeds',
    desc: 'Self-supervised DINO, DINOv2 and V-JEPA vision transformers for surgical phase detection, >90% accuracy with minimal annotations.',
  },
  {
    year: 2025,
    title: 'Quantum Buddies co-founder',
    org: 'Independent research collective',
    desc: 'Quantum ML, Quantum Continuous Thought Machines, quantum attention. Bradford Grand Prix and YQuantum (Yale) 1st place.',
  },
  {
    year: 2024,
    title: 'Published: Pothole Detection',
    org: 'arXiv:2401.08588',
    desc: 'YOLOv7 + ESRGAN achieving 94.7% precision, 82.6% recall without LIDAR sensors.',
  },
  {
    year: 2022,
    title: 'Published: Hopfield Networks & TSP',
    org: 'arXiv:2202.13746',
    desc: 'Comparative optimization study contributing to computational complexity research.',
  },
];

export const EDUCATION = [
  {
    years: '2024–2025',
    title: 'MSc Computer Science & Artificial Intelligence',
    org: 'University of Leeds',
    note: 'Thesis on surgical video prediction. HELIX XR / Science Museum Group collaboration on Dalton Mills.',
  },
];

export const RESEARCH_INTERESTS = [
  'Self-supervised vision for surgical workflow',
  'Video prediction and generative models in medicine',
  'Vision-language-action policies for robotics',
  '3D reconstruction (NeRF, Gaussian splatting, photogrammetry)',
  'Hybrid quantum–classical algorithms and quantum ML',
];

export const ACADEMIC_PROFILES = {
  orcid: 'https://orcid.org/0009-0008-0480-9241',
  dblp: 'https://dblp.org/pid/345/4093.html',
  googleScholar: null,
  linkedin: 'https://www.linkedin.com/in/gyanateet-dutta-386215192/',
  github: 'https://github.com/Ryukijano',
  wandb: 'https://wandb.ai/ryukijano',
};

export const ACADEMIC_BIO = {
  name: 'Gyanateet Dutta',
  role: 'MSc CS & AI · University of Leeds',
  statement:
    'I build vision systems that have to work under real constraints: surgical video, limited labels, and hardware that cannot wait. Parallel to that I work on hybrid quantum–classical algorithms through Quantum Buddies. This page is the academic record. The personal site is the build log.',
};
