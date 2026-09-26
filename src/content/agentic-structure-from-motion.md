Structure-from-motion rebuilds a scene in 3D from ordinary photographs. It works by finding the same points in pairs of images and solving for where the cameras must have been. On easy pairs, a modern matcher does this almost perfectly. On hard pairs it falls apart: two photos with little overlap, a big change in viewpoint, repeated textures such as windows on a façade, or two different buildings that look alike.

The usual response is a better matcher. This project tries something else. It trains a small multimodal model to decide *how* to handle each pair: which tool to call, on which crop, and when to give up on a match that looks wrong. A frozen matcher applies one strategy to every pair; an agent can change strategy per pair.

The idea is Gabriele Berton's. He posted it publicly on LinkedIn on 3 July 2026, as his research idea number 11, and he has not published a paper on it. This repository is my implementation, and it is still in progress.

## What the agent can do

The agent talks to a small tool server over HTTP. It can:

- **crop** a region of either image, to zoom in on the part that overlaps;
- **match** two images or crops, with LoFTR, MASt3R or LightGlue;
- **check for doppelgangers**, to catch two similar-looking but different places;
- **retrieve** related images;
- **run SfM** with COLMAP; and
- **inspect** the result.

A rollout is capped at 10 tool calls and 15 turns, so the agent cannot solve a pair by brute force.

## How it is rewarded

The reward follows what structure-from-motion actually cares about, which is getting the camera pose right. The main term checks whether the recovered relative pose is within 5°, 10° and 20° of the truth, averaged as a pass or fail at each threshold. That is a coarse stand-in for the standard pose AUC. Smaller terms reward the inlier count and correctly formatted tool calls, and a penalty discourages invalid ones.

The first design also charged a small cost for every tool call. The current configuration switches that off in favour of an accumulative tool coefficient, taken from PyVision-RL, which shapes tool use over the whole rollout rather than taxing each call.

## Training

The policy is `Qwen/Qwen3.5-2B` with a LoRA adapter (rank 32, α 64). It is trained with GRPO in groups of eight, with the clip-higher and dynamic-sampling changes from recent work. The current configuration uses S-GRPO. The repository carries both a custom GRPO loop and a VeRL configuration.

It runs on three NVIDIA L40S GPUs on the AIRE cluster:

- one serves rollouts through vLLM;
- one trains the LoRA adapter under FSDP;
- one runs the matchers the agent calls.

The training set is 1,535 hard pairs from MegaDepth, drawn from 102 scenes. The curriculum starts with medium pairs for 10 epochs, then medium and hard pairs for 20, then everything for 20, at a learning rate of 1 × 10⁻⁵.

## Phase 0: an untrained agent is worse than no agent

Before any training, I checked whether a capable model could simply be prompted to use the tools well. On a small, synthetic set of hard pairs it could not. The zero-shot agent averaged 8.9 inliers, against 12.4 for calling a matcher directly.

A second check on 12 real MegaDepth pairs showed why. The untrained model asked for full-frame crops every time, so its matches were identical to direct matching. It had tools and did not use them. That result is the reason for the reinforcement learning, rather than prompting.

## Phase 1: the reward is rising

The Phase 1 run is under way. Over the first 30 logged steps, the mean reward rose from 0.374 to 0.496, with an epoch-one mean of 0.388. The run was resumed from its latest checkpoint after I fixed a logging bug.

These are the best matches the agent produced at steps 10, 20 and 30. They scored 432 inliers (85%), 540 inliers (93%) and 295 inliers (67%), with rewards of 0.58, 0.58 and 0.57.

<!-- figure 1 -->

A rising training reward is not an evaluation. I have not yet compared the trained policy against direct matching on held-out pairs, and until I have, there is no result to claim beyond "the policy is learning something the reward measures".

## What comes next

Phase 2 moves from pairs to whole scenes: the agent builds a reconstruction from a set of images instead of a single pair. That pipeline is implemented and passes its 180 tests, and it is being validated now. Phase 3, a proper benchmark against standard SfM on hard scenes, is planned.

The adapters from each stage are on Hugging Face: pair-level fine-tuning, the Phase 1 GRPO checkpoint, and scene-level fine-tuning.
