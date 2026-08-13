/** Structured academic record. Claims stay on this object; the page only lays them out. */

const academic = {
  bio: {
    name: 'Gyanateet Dutta',
    role: 'Research technician · University of Leeds',
    statement:
      'I train vision models on surgical video under sparse labels and tight inference budgets. Parallel to that I write hybrid quantum–classical algorithms with Quantum Buddies.',
  },

  education: [
    {
      title: 'MSc Advanced Computer Science (Artificial Intelligence)',
      org: 'University of Leeds',
      years: '2023–2024',
      note: 'Self-reported dates. AIMS intern Mar–Nov 2025; research technician from Nov 2025.',
    },
  ],

  interests: [
    'Sparse-label surgical phase detection',
    'Surgical video prediction',
    'Image-based 3D reconstruction',
    'Hybrid quantum–classical algorithms',
  ],

  profiles: {
    orcid: 'https://orcid.org/0009-0008-0480-9241',
    github: 'https://github.com/Ryukijano',
    linkedin: 'https://www.linkedin.com/in/gyanateet-dutta-386215192/',
    wandb: 'https://wandb.ai/ryukijano',
  },

  nav: [
    { id: 'interests', label: 'Research interests' },
    { id: 'education', label: 'Education' },
    { id: 'publications', label: 'Selected publications' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'software', label: 'Software' },
  ],

  publications: [
    {
      title:
        'Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection',
      authors: ['G. Dutta', 'A. Hammad', 'T. Archer', 'Q. Dou', 'N. Mohammed', 'S. Ali'],
      venue: 'IEEE ISBI 2026',
      year: 2026,
      doi: '10.1109/isbi61048.2026.11515812',
      pdf: null,
      code: 'https://github.com/Ryukijano/DINOEndo',
      to: '/work/surgical-phase-detection',
      internal: true,
      note: '89.5% patient / 90.0% porcine in the paper, not a clinical deployment.',
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
      doi: null,
      arxiv: '2401.08588',
      pdf: 'https://arxiv.org/pdf/2401.08588',
      code: 'https://github.com/Ryukijano/ESRGAN_AND_YOLOV7',
      to: 'https://arxiv.org/abs/2401.08588',
      internal: false,
      note: 'Unreviewed preprint. N. K. Rout first author; G. Dutta co-author.',
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
      doi: null,
      arxiv: '2202.13746',
      pdf: 'https://arxiv.org/pdf/2202.13746',
      code: null,
      to: 'https://arxiv.org/abs/2202.13746',
      internal: false,
      note: 'Unreviewed preprint. Sole author.',
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
  ],

  timeline: [
    { year: 2026, title: 'ISBI paper', org: 'IEEE ISBI' },
    {
      year: 2025,
      title: 'Research technician from Nov',
      org: 'University of Leeds',
    },
    {
      year: 2025,
      title: 'AIMS intern Mar–Nov',
      org: 'AI in Medicine and Surgery',
    },
    {
      year: 2025,
      title:
        'Quantum Buddies; YQuantum Quantum Rings virtual track (not Yale Grand Prize); Bradford teammate-reported prizes',
      org: null,
    },
    { year: 2024, title: 'Dalton Mills / HELIX XR', org: null },
    {
      year: 2024,
      title: 'MSc Advanced Computer Science (Artificial Intelligence)',
      org: 'University of Leeds',
    },
    { year: 2024, title: 'Pothole preprint', org: 'arXiv:2401.08588' },
    { year: 2022, title: 'TSP preprint', org: 'arXiv:2202.13746' },
  ],

  software: [
    {
      name: 'syndrome-net',
      description: 'QEC simulation, decoding and RL control across five code families',
      href: 'https://github.com/Ryukijano/syndrome-net',
    },
    {
      name: 'Conditional_GQE',
      description: 'Generative quantum circuit design, validated on QPU hardware',
      href: 'https://github.com/Quantum-Buddies/Conditional_GQE',
    },
    {
      name: 'DINOEndo',
      description: 'Self-supervised surgical phase recognition (ISBI 2026)',
      href: 'https://github.com/Ryukijano/DINOEndo',
    },
    {
      name: 'ESRGAN_AND_YOLOV7',
      description: 'Implementation for the pothole preprint',
      href: 'https://github.com/Ryukijano/ESRGAN_AND_YOLOV7',
    },
    {
      name: 'vae-surgical-prediction',
      description: 'Surgical video frame prediction',
      href: 'https://github.com/Ryukijano/vae-surgical-prediction',
    },
  ],

  hackathonNote: 'Hackathon notes live on /work.',
};

export default academic;
