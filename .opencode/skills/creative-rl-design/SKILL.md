---
name: creative-rl-design
description: Design aesthetic or creative RL the way the paint-with-code Qwen run actually worked after the first reward collapsed — pairwise VLM vs a hand-rated pool, one real image metric, tiny compile/length gates, GEPA on a short allowlist not a 400-line spec. Use when choosing rewards for images/code aesthetics, GRPO for generative art, reference pools, or prompt optimisation for a constrained API.
---

# Creative RL as a reward-design problem

The paint-with-code run (Qwen 3.5 35B, GRPO, p5.brush in a Puppeteer sandbox) did not stall because the model was too small. It stalled because the **reward was a committee of correlated judges plus a length ramp**. Load this skill when you are about to write a reward, a preference pool, or a system prompt for a tool-using generator.

How the trained policy *draws*: skill `paint-with-code`. Numbers and loop: [references/training-loop.md](references/training-loop.md).

Source: [Training AI to Paint with Code](https://surya.website/rling-qwen-to-paint-with-code) — Surya Narreddi, Cameron Franz, Alex Wang. Dated March 2026; page last seen updated 2026-08-23. Not Gyanateet's run.

## The loop that shipped

```
prompt  →  policy writes complete p5.brush JS
        →  Puppeteer sandbox PNG (compile or die)
        →  pairwise VLM vs two refs from a hand-rated pool
        →  GRPO
```

The judge question is relative, not a score: *which of these is the better hibiscus watercolour?* Reward is the **fraction of comparisons won**.

Sandbox is the environment. The VLM is not the policy. Do not train the painter to emit scores.

## Reward (after collapse)

Four terms. Same base model, same prompts. Reached the old ~0.65 plateau three times faster, then climbed. Completions **13,500 → under 2,000 tokens**.

| Term | Weight | Job |
| --- | --- | --- |
| Compile + uses-brush | 0.05 | **binary** gate: ran, called p5.brush not only native p5 |
| Length | 0.05 | **binary** check, not a ramp. The old ~⅓-of-reward length ramp saturated by step 30 and produced zero gradient |
| HPSv3 | 0.30 | the one automatic metric that still had variance |
| Pairwise vs pool | 0.60 | win rate against two draws from the hand-rated refs |

They did **not** get to the next step: train a small reward model on the ratings (proper RLHF) so scoring would not need the pool at every step. Do not write as if they did.

## What not to do (the 9-signal failure)

First rubric: compilation gate, uses-brush check, length ramp targeting ~3,000 tokens, HPSv3 at **0.10**, prompt-adherence council (GPT-5.4 + Gemini), plus four quality judges (recognisability, aesthetics, technique, depth).

Plateau ~0.65. Every rollout the same flat five-petal clip-art. Reward still rose.

Diagnosis:

- Four quality judges + adherence correlated **0.85–0.95** — one signal, five coats of paint.
- Length ≈ one third of total reward, dead after step 30.
- HPSv3 (real variance) under-weighted at 0.10.
- Absolute 0–10 scores came back **compressed near zero**.

Rules:

1. **Do not average five aesthetic judges.** If they correlate, keep one pairwise comparison.
2. **Do not let length dominate.** Make it a small binary gate. Short code that paints is what the new run learned.
3. **Put weight where there is variance.** Here: HPSv3 + pool pairwise, not "rate 1–10 adherence".
4. **Pairwise vs a pool beats absolute scores.** "Better than these two love-tier sheets?" opened dynamic range. "Score 0–10" did not.

## The pool is the taste

| Number | What |
| --- | --- |
| 1,664 | generations sorted by hand into love / okay / nope |
| 117 | love-tier (seeded the comparison pool) |
| 266 | okay |
| 198 | supplements from a later run (widen thin colour slices) |
| 581 | refs actually used (117 + 266 + 198) |

**Every pool image is model output.** They could not source enough human p5.brush paintings. The prior you will get is the prior you rate. August samples are still hibiscus because the pool was.

Pool generators: AutoResearch (Opus 4.6, GPT-5.4, Gemini 3.1 Pro) iterating against reference photographs under a VLM judge, plus a larger Gemini 3.1 Pro batch. Both used a system prompt evolved with **GEPA**.

## GEPA on the tool spec

400-line API dump → confident code that **invented methods** → empty canvases.

200 iterations against a taste-anchored **7-shot** judge. Converged on a prompt with a **strict allowlist of eight brush methods, no API documentation, no examples**. First 3/3 visible hibiscus blobs was the version written **after throwing the spec out**.

When prompting a constrained library:

- Name the allowed calls. Stop.
- Do not include the README.
- Few-shot **taste** for the judge is separate from few-shot **API** for the policy. Do not put clip-art full sketches in the tool spec if that is the attractor you are trying to escape.

Post-training August sketches use a slightly larger closed list (see `paint-with-code` allowlist). Still not the README.

## Honesty when writing this up

- They do not claim this is a better way to make images. It is slower. The claim is: **RL on aesthetics is a design problem for the reward** (too rigid → copy the pool; too loose → learn nothing).
- Project ongoing; one further training run was planned to fix issues found along the way.
- A full technical report was promised for June 2026. Do not invent that it shipped.
- Cite Surya Narreddi, Cameron Franz, Alex Wang. Do not attribute the run to Gyanateet. Not a `/work` entry. Not a replacement for the Kanagawa plate.

## Done when

- Reward has at most one correlated aesthetic head, expressed as pairwise vs a rated pool.
- Compile / tool-use is a small **binary** gate, not the objective.
- Length cannot outvote image quality (binary, tiny weight).
- Tool prompt is an allowlist, not an API manual.
- Pool labels match the taste you actually want after training.
