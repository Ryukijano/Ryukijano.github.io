The small picture on the home page is me as a child, at a beige desktop computer. Games and graphics got me into computers, and I never got out.

What has stayed with me is the part where a picture has to be built. Photogrammetry in Unreal, a CUDA kernel and a differential equation on the GPU are, to me, the same habit. Games never quite left the work, either: when I took the Hugging Face deep reinforcement-learning course, Doom and a walking ant were how I checked whether an [agent had learnt anything](/work/deep-rl-and-hugging-face).

## Pictures as data

The print on the home page is that habit in one image. Read left to right, it is the same wave three times: painted, then encoded as RGB pixels, then drawn as a wireframe. It is a schematic, and its caption says so. The three thirds carry my three handles: Ryukijano for the real world, Yana for the encoding and Ryoushi for the digital.

[Dalton Mills](/work/dalton-mills-vr-reconstruction) was a picture I had to build back from very little. The mill, in Keighley, was destroyed by fire in 2022. From September to December 2024 I worked on a VR reconstruction of it with the Science Museum Group's Congruence Engine and Leeds HELIX XR, alongside Alex Neish, Yuan Gao and Simon Popple. The [Leeds case study](https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/) records that we had ten photo stills to work from. No pre-fire laser scan exists to compare the model with, so its geometry can only be as faithful as those photographs.

We rebuilt it with photogrammetry and NeRF methods in Unreal Engine 5, as a PCVR experience. As I told the case study, AI can be inaccurate, so we had to stick closely to the records.

The same question keeps coming back in smaller forms. [B3tt3r](/work/b3tt3r-3d-reconstruction) is two photographs and a surface that has to agree with both. My [agentic structure-from-motion](/work/agentic-structure-from-motion) work trains an agent to choose a geometric tool for each hard pair of photographs. The research idea is Gabriele Berton's, the implementation is mine, and it is still in progress.

## What comes next in a clip

A photograph is one moment. A clip has an order, and the question I keep asking of one is what comes next.

My [MSc thesis](/work/msc-thesis-surgical-video-prediction) at Leeds asked it literally: predict the next frames of a surgical clip. The model was a VAE–Transformer, and in my experiments it improved PSNR by 2.36 dB over the selected baselines. That is my own measurement on the JIGSAWS test set; longer-horizon drift and any effect downstream of the prediction fell outside the study.

Then, from March to November 2025, I was a research intern with [AIMS](/work/aims-surgical-phase-detection), the AI in Medicine and Surgery group at Leeds. There the question became which phase of an operation a clip shows. Sharib Ali supervised me, and I worked with clinicians from Leeds Teaching Hospitals NHS Trust on video of endoscopic submucosal dissection.

That work became the ISBI 2026 paper [Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection](https://doi.org/10.1109/isbi61048.2026.11515812), with Aya Hammad, Thomas Archer, Qi Dou, Noor Mohammed and Sharib Ali. It pairs a self-supervised DINOv2 backbone, adapted by pretraining first on unannotated porcine video and then on human endoscopic video, with lightweight temporal models. It reports 89.5% accuracy on the patient test set and 90.0% on the porcine test set. Both are accuracies on the paper's own test sets for one procedure, and neither says how the model would do in an operating theatre.

The scores matter less to me than the question behind them. Phase recognition is often treated as a classification problem, and I think it is more interesting as a question about representation learning:

> Can a model learn how a procedure evolves over time without depending entirely on dense labels and supervised temporal decoders?

Surgical video is expensive to annotate, phase boundaries are not always clean, and a supervised temporal decoder can end up tied to one annotation protocol, dataset or surgeon's style. The DINOv2 route moves some of that burden off the temporal model and onto stronger self-supervised features.

I also explored V-JEPA-2 and world-model-style representations, to see whether they could capture the temporal structure more naturally than a separately supervised decoder attached afterwards. The results were interesting, but the larger pretrained models are slower to run. The [paper's abstract](https://doi.org/10.1109/isbi61048.2026.11515812) puts its DINOv2 model at fourteen times fewer parameters than foundation models such as V-JEPA2. That is a parameter count, not a speed measurement.

Two smaller threads hang off the same question. [GOT-JEPA tool tracking](/work/got-jepa-surgical-tool-tracking) tries to keep each surgical tool identified as the camera moves; it is public code, with no benchmark score stated. A [Causal-JEPA reproduction](/work/causal-jepa-reproduction) asks what has to be masked before a model can plan. That is someone else's paper, and I claim none of its results.

## The hands-on side

The hands-on side stays: CUDA, simulation and quantum circuits.

On an NVIDIA DGX Spark I worked through [twenty-two small CUDA labs](/work/cuda-blackwell-labs), each built around one question and the number that answers it. All of them ran on that one machine with CUDA 13.0, and most of the numbers are single runs. The line I would keep from that write-up is its warning about the memory the CPU and GPU share: the 128 GB is not HBM. It is a great deal of memory for a desktop, but most CUDA advice is written for data-centre cards with several times its bandwidth, and not all of that advice carries over.

With Quantum Buddies, which I co-founded with Sid Iliyasu and Dat Chi Le, we built [H-cGQE](/work/h-cgqe-conditional-gqe): a Transformer that reads a molecule's Hamiltonian and proposes the operator sequence for a quantum circuit. The part of that write-up I would point to is where it did not work. Our own ablation found that reinforcement learning helped the smallest molecule, H₂, and made every larger one slightly worse. A later check suggests why: the cheap energy estimate it learnt from barely tracked the fully optimised energy, so the learning signal was mostly noise.

## What I keep coming back to

Two questions, mostly.

The first is sparse labels. I want to know what a model learns from surgical video when only some of the frames are labelled, and whether that helps it recognise the phase of an operation or predict what comes next. The direction I would like surgical AI to take is models that learn from how a procedure unfolds, not just from its labels.

The second is whether a learned model can design a quantum circuit worth running for molecular simulation. H-cGQE has not answered that yet: the test that would, on molecules the model has never seen, is still open. I still like writing a circuit by hand, too.

These days I am a research technician at the University of Leeds. The habit is still the one from the beige PC: I like the part where a picture has to be built.
