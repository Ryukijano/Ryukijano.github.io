QuantumForge began as a holiday exercise: a quantum-circuit simulator written from scratch in Rust. It is a statevector simulator with a Python bridge, so a circuit written for Qiskit can run on it, plus two small variational algorithms built on top.

It is not a replacement for Qiskit Aer, and the benchmarks below show exactly where it stops keeping up.

## What is inside

The code is a Rust workspace of four crates: `tensor_core`, `rust_kernels`, `vqe` and `gqe`. The simulator lives in `rust_kernels`, and it is exposed to Python through PyO3 and built with maturin as the package `qhybrid-kernels`.

The state of an *n*-qubit register is a column of 2ⁿ complex amplitudes. QuantumForge stores it as a 2ⁿ × 2 array of 64-bit floats, one column for the real parts and one for the imaginary parts, which is also the shape it hands back to NumPy. Applying a gate means walking that array and mixing the pairs of amplitudes the gate touches.

The gate set covers what most textbook circuits need:

- single-qubit: I, X, Y, Z, H, S, S†, T, T†;
- rotations and phases: RX, RY, RZ, P and the general U3;
- controlled: CX, CY, CZ and the Toffoli (CCX).

Each gate kernel is a straight loop over the state, run with Python's global interpreter lock released so the Python side is not blocked while Rust works. The loops themselves are serial; rayon is used elsewhere in the workspace, not yet on the statevector path. Parallel gate application is the obvious next step.

There is also a small noise module: Pauli channels simulated with Monte Carlo trajectories, general Kraus operators on a density matrix, and correlated Pauli noise. The amplitude-damping channel is tested against Qiskit's own implementation.

## How it compares

The benchmark harness builds one circuit at every size from 4 to 26 qubits, a Hadamard on every qubit followed by a chain of CNOTs, and times it once on each simulator. It compares three:

- a naive NumPy simulator, dropped once a single run takes more than 15 seconds;
- Qiskit Aer on the CPU, with transpilation included in its time;
- QuantumForge.

At 16 qubits, QuantumForge was about 4,000 times faster than the NumPy simulator. Against Aer, it was faster up to 18 qubits and slower from 19 onwards, where Aer's optimised, multithreaded kernels take over. The largest state, at 26 qubits, is 2²⁶ amplitudes, which in this layout is 1 GiB.

<!-- figure 1 -->

That crossover is the honest summary. For small circuits, where overhead dominates, a lean single-threaded Rust loop wins. For large ones, where the work is the state itself, it needs the parallelism and vectorisation that Aer already has.

The timings are single runs on one consumer machine with 48 GB of memory, from my own harness, so the curves say where the crossover is, not what it would be on other hardware.

## VQE and GQE on the smallest molecule

To check the simulator is not just fast but right, I ran two ways of finding a ground-state energy on a two-qubit model of H₂, whose exact ground energy is about −1.857275 hartree.

- **VQE**, the variational quantum eigensolver: a four-parameter hardware-efficient circuit whose angles are tuned by Nelder–Mead. The Rust version reached −1.857274, within 1.07 × 10⁻⁶ hartree of exact.
- **GQE**, here an evolutionary search over circuits: a population of 50 candidates evolved for 200 generations by tournament selection, mutation and angle tuning. It reached −1.857275030, within 5.15 × 10⁻¹⁴.

In the same comparison, the Qiskit Aer VQE stopped at −1.848820, 8.45 × 10⁻³ hartree away. I have not yet worked out why the backends disagree by that much on a two-qubit problem, so treat the cross-backend numbers as a prompt to investigate rather than a ranking.

H₂ with two qubits is the smallest test there is. These results show that the simulator and the optimisers are correct, not that they scale.

## What I would do next

- Parallelise gate application across the state, with rayon, which is already a dependency.
- Store amplitudes as interleaved complex numbers and vectorise the inner loops.
- Repeat every benchmark point and record the machine, so the curves come with error bars.
- Add Rust-side tests alongside the eight Python ones.
