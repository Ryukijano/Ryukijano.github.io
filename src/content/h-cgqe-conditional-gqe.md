Finding the ground-state energy of a molecule is one of the problems quantum computers are meant to be good at. The hard part is not running a circuit but choosing which one: the circuit has to be short enough to survive today's noisy hardware and expressive enough to reach the right state. For the Mitsubishi Chemical Group and AIST challenge at GIC 2026, our team, Ryoushi / Quantum Buddies, built H-cGQE to learn that choice from the molecule itself.

This write-up covers what we built, what the results show, and where they are weaker than they first look.

## From GQE to a conditioned GQE

The generative quantum eigensolver (GQE; Nakaji et al., arXiv:2401.09253) treats circuit design as sequence generation. A Transformer writes a circuit one operator at a time, choosing each from a fixed pool, and it is trained so that circuits with lower energy become more likely. It is the same trick a language model uses, with gates in place of words.

Plain GQE learns one molecule at a time. H-cGQE, the Hamiltonian-conditioned GQE, feeds the molecule's Hamiltonian into the model, so one network can propose circuits for many molecules:

- **An encoder reads the Hamiltonian** as its list of Pauli terms, embedded symbol by symbol.
- **A decoder picks operators** from the pool, attending to that encoding at every step.

The model is small, about 7.7 million parameters (256-dimensional, 8 heads, 4 layers). The operator pool is the set of UCCSD excitations, mapped to qubits with the Jordan–Wigner transform. It grows fast with molecule size: 192 entries for H₂ on 4 qubits, 1,408 for LiH on 12, 3,456 for BeH₂ on 14 and 11,088 for N₂ on 20.

We also built a chemical graph neural network, three layers of message passing over the molecule's bonds. In the final code it conditions a CUDA-Q GQE baseline, not the H-cGQE model itself.

<!-- figure 1 -->

## Training it

Training has two stages.

1. **Supervised fine-tuning** for 300 epochs teaches the model what reasonable circuits look like.
2. **Reinforcement learning** with DAPO then runs for 24 epochs over 32 molecules, using asymmetric clipping (0.2 below, 0.28 above).

The reward is mostly energy, with smaller terms for entanglement (0.1), circuit depth (0.05), commuting structure (0.05) and diversity (0.2). An optional quality-diversity mode, QD-GRPO, keeps a MAP-Elites archive: a 10 × 10 grid over entanglement density and circuit depth that holds the best circuit found in each cell. It adds a novelty bonus that decays from 1.0 to 0.1 over training, so early exploration gives way to exploitation.

Each proposed circuit still needs its rotation angles. L-BFGS-B tunes them, cheaply during training (three to five iterations) and fully for evaluation (200 iterations, tolerance 10⁻¹⁰). Simulation ran on CUDA-Q, on NVIDIA L40S GPUs on the AIRE cluster and B200s through qBraid, behind a cache of more than 24,000 computed energies.

## The headline result, read carefully

Our headline number is 0.63 mHa: the error of the H-cGQE circuit for methyl iodide in an 8-qubit active space (four electrons in four orbitals, STO-3G basis), measured against the exact answer in that space. Chemical accuracy is usually taken as 1.6 mHa, so on its face this clears the bar.

Three details matter.

- **The circuit is one operator.** The model's best proposal was a single `XYYX` term, and its optimised angle is 0.000244, almost zero.
- **The starting point was already close.** Diagonalising the repository's own Hamiltonian for this problem shows that the Hartree–Fock state that every circuit starts from is only 1.04 mHa from exact, already inside chemical accuracy, and H-cGQE improves on it by 0.41 mHa.
- **The strongest comparison does not hold up.** The CUDA-Q GQE baseline is recorded at 2.65 mHa, but its energy is *below* the exact ground state, which is impossible on the same Hamiltonian. That baseline must have run on a different problem, so the "four times better" comparison should not be made.

The hardware-efficient VQE baseline, a generic circuit with no chemistry in it, was 987.8 mHa out. That gap is real, and it is the clearest evidence that chemically structured circuits matter.

The 0.63 mHa run also came from a checkpoint trained with REINFORCE on energy rewards, not from the DAPO or QD-GRPO training described above.

## Did reinforcement learning help?

Our own ablation says: mostly not yet. Compared with the supervised model alone, reinforcement learning took H₂ from 20.52 mHa to 0.15. On every larger molecule it made things slightly worse.

| Molecule | After fine-tuning (mHa) | After RL (mHa) |
|---|---|---|
| H₂ | 20.52 | 0.15 |
| LiH | 1.81 | 1.85 |
| BeH₂ | 33.77 | 34.81 |
| Methyl iodide (12 orbitals) | 1.43 | 1.59 |
| N₂ | 126.56 | 126.77 |

A later check suggests why. The cheap energy estimate used during training, with the angles held fixed, correlated only weakly with the fully optimised energy (Spearman 0.23, p = 0.42). The learning signal was mostly noise. Across the whole suite, 4 of the 17 molecules we benchmarked reached chemical accuracy in simulation.

## On real quantum hardware

We ran selected circuits on hardware through qBraid.

- **IQM Emerald** prepared the 8-qubit Hartree–Fock state with a fidelity of 0.875: 896 of 1,024 shots came back exactly right. That tests state preparation, not energy.
- **Rigetti Cepheus** ran 12 molecules, several using sample-based quantum diagonalisation. The best error was 13.95 mHa, for methyl iodide on 12 qubits. None reached chemical accuracy.
- **IonQ**: a job was submitted, but no result is recorded.

We also tried fragmenting a molecule so a 12-qubit problem could be solved with circuits of at most 8 qubits. In simulation the fragmentation cost 11.3 mHa. On hardware the error was about a hartree.

## What it adds up to

We built a working end-to-end system: a Hamiltonian-conditioned circuit generator, a training pipeline with quality-diversity reinforcement learning, GPU simulation at scale, and runs on two hardware vendors with a third submitted. The engineering held up, and structured circuits beat a generic ansatz by a wide margin.

The learning did not yet pay off beyond the smallest molecule. The headline result sits on a problem where Hartree–Fock is already accurate, and the next step is clear. We need a training signal that tracks the converged energy, and an evaluation on molecules the model has never seen. That held-out test is still open.
