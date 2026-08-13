export const PUBLICATIONS = [
  {
    title:
      'Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection',
    authors: ['G. Dutta', 'A. Hammad', 'T. Archer', 'Q. Dou', 'N. Mohammed', 'S. Ali'],
    venue: 'IEEE International Symposium on Biomedical Imaging (ISBI)',
    year: 2026,
    type: 'conference',
    arxiv: null,
    doi: '10.1109/isbi61048.2026.11515812',
    pdfUrl: null,
    codeUrl: 'https://github.com/Ryukijano/DINOEndo',
    note: '89.5% accuracy on the patient set and 90.0% on the porcine set in the paper; not a clinical deployment study.',
    bibtex: `@inproceedings{dutta2026selfsupervised,
  title={Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection},
  author={Dutta, Gyanateet and Hammad, Aya and Archer, Thomas and Dou, Qi and Mohammed, Noor and Ali, Sharib},
  booktitle={IEEE ISBI 2026},
  year={2026},
  doi={10.1109/isbi61048.2026.11515812}
}`,
  },
  {
    title: 'Improved Pothole Detection Using YOLOv7 and ESRGAN',
    authors: ['N. K. Rout', 'G. Dutta', 'V. Sinha', 'A. Dey', 'S. Mukherjee', 'G. Gupta'],
    venue: 'arXiv preprint',
    year: 2024,
    type: 'preprint',
    arxiv: '2401.08588',
    doi: null,
    pdfUrl: 'https://arxiv.org/abs/2401.08588',
    codeUrl: null,
    note: 'Submitted November 2023. Unreviewed preprint.',
    bibtex: `@article{rout2024pothole,
  title={Improved Pothole Detection Using YOLOv7 and ESRGAN},
  author={Rout, Nirmal Kumar and Dutta, Gyanateet and Sinha, Varun and Dey, Arghadeep and Mukherjee, Subhrangshu and Gupta, Gopal},
  journal={arXiv preprint arXiv:2401.08588},
  year={2024},
  eprint={2401.08588},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}`,
  },
  {
    title: 'Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms',
    authors: ['G. Dutta'],
    venue: 'arXiv preprint',
    year: 2022,
    type: 'preprint',
    arxiv: '2202.13746',
    doi: null,
    pdfUrl: 'https://arxiv.org/abs/2202.13746',
    codeUrl: null,
    note: 'Unreviewed preprint.',
    bibtex: `@article{dutta2022tsp,
  title={Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms},
  author={Dutta, Gyanateet},
  journal={arXiv preprint arXiv:2202.13746},
  year={2022},
  eprint={2202.13746},
  archivePrefix={arXiv},
  primaryClass={cs.AI}
}`,
  },
];

export const RESEARCH_TIMELINE = [
  {
    year: 2026,
    title: 'Self-supervised ViT for surgical phase recognition',
    org: 'IEEE ISBI',
    desc: 'Peer-reviewed conference paper on endoscopic submucosal dissection.',
  },
  {
    year: 2025,
    title: 'Research technician (from Nov)',
    org: 'University of Leeds',
    desc: 'Research technician at the University of Leeds from November 2025.',
  },
  {
    year: 2025,
    title: 'AIMS research intern (Mar–Nov)',
    org: 'AI in Medicine and Surgery',
    desc: 'Research intern, AI in Medicine and Surgery (AIMS).',
  },
  {
    year: 2025,
    title: 'Quantum Buddies; Bradford (teammate-reported prizes) and YQuantum Quantum Rings virtual track',
    org: null,
    desc: 'Hackathon notes with Quantum Buddies. YQuantum was a virtual-track win, not the Yale Grand Prize.',
  },
  {
    year: 2024,
    title: 'Dalton Mills reconstruction',
    org: 'Science Museum Group / HELIX XR',
    desc: 'Heritage reconstruction with the Science Museum Group and HELIX XR.',
  },
  {
    year: 2024,
    title: 'MSc Advanced Computer Science (Artificial Intelligence)',
    org: 'University of Leeds',
    desc: 'Self-reported dates 2023–2024.',
  },
  {
    year: 2024,
    title: 'Improved Pothole Detection Using YOLOv7 and ESRGAN',
    org: 'arXiv:2401.08588',
    desc: 'Unreviewed preprint; submitted November 2023.',
  },
  {
    year: 2022,
    title: 'Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms',
    org: 'arXiv:2202.13746',
    desc: 'Unreviewed preprint.',
  },
];

export const EDUCATION = [
  {
    years: '2023–2024',
    title: 'MSc Advanced Computer Science (Artificial Intelligence)',
    org: 'University of Leeds',
    note: 'Self-reported dates. Research intern, AI in Medicine and Surgery (AIMS), 2025.',
  },
];

export const RESEARCH_INTERESTS = [
  'Sparse-label surgical phase detection',
  'Surgical video prediction',
  'Image-based 3D reconstruction',
  'Hybrid quantum–classical algorithms',
];

export const ACADEMIC_PROFILES = {
  orcid: 'https://orcid.org/0009-0008-0480-9241',
  dblp: null,
  googleScholar: null,
  linkedin: 'https://www.linkedin.com/in/gyanateet-dutta-386215192/',
  github: 'https://github.com/Ryukijano',
  wandb: 'https://wandb.ai/ryukijano',
  ieee: 'https://doi.org/10.1109/isbi61048.2026.11515812',
};

export const ACADEMIC_BIO = {
  name: 'Gyanateet Dutta',
  role: 'Research technician · University of Leeds',
  statement:
    'I train vision models on surgical video under sparse labels and tight inference budgets. Parallel to that I write hybrid quantum–classical algorithms with Quantum Buddies.',
};
