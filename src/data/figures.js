/**
 * The /figures gallery: six case-study figures, pinned rather than hung,
 * plus three redrawn studies. Each case-study card keeps its caption and
 * scope line word for word and points back to its case study; the studies
 * are drawing exercises after pinned references, not results.
 */
import spiralArt from '../../media/study-spiral.svg?raw';
import waveArt from '../../media/study-wave.svg?raw';
import treeArt from '../../media/study-circuit-tree.svg?raw';

/** [project slug, 1-based figure number]. Posters, never GIF mid-frames. */
export const GALLERY_CASE_STUDIES = [
  ['physics-informed-neural-networks', 1],
  ['aims-surgical-phase-detection', 1],
  ['quantum-error-correction', 1],
  ['hopfield-networks-and-tsp', 1],
  ['pothole-detection-arxiv', 1],
  ['iquhack-2026-nvidia-labs', 1],
];

export const GALLERY_STUDIES = [
  {
    id: 'study-spiral',
    art: spiralArt,
    width: 640,
    height: 360,
    alt: 'A spiral tunnel of concentric rings with one thread winding out.',
    caption: 'Study I — a spiral tunnel, redrawn after a pinned reference.',
    scope: 'A drawing exercise from geometry. Not a result from any project.',
  },
  {
    id: 'study-wave',
    art: waveArt,
    width: 640,
    height: 360,
    alt: 'Parallel wave lines running across the sheet, one picked out.',
    caption: 'Study II — wave lines, redrawn after a pinned reference.',
    scope: 'A drawing exercise from geometry. Not a result from any project.',
  },
  {
    id: 'study-circuit-tree',
    art: treeArt,
    width: 640,
    height: 360,
    alt: 'A tree of circuit traces rising from one root pad to square ends.',
    caption: 'Study III — a circuit tree, redrawn after a pinned reference.',
    scope: 'A drawing exercise from geometry. Not a result from any project.',
  },
];
