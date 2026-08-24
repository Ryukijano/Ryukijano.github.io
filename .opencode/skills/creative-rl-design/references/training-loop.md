# Training loop (paint-with-code Qwen)

Narrative: https://surya.website/rling-qwen-to-paint-with-code — dated March 2026, page seen updated 2026-08-23. Team: Surya Narreddi (design, development, RL research), Cameron Franz (training infrastructure), Alex Wang. Conversations with Evan Casey on reward as a creative artefact.

Treat the essay as the **reward story**. Treat the 2026-08-23 editor sketches as **post-training behaviour** (skill `paint-with-code`). A cached diagram names the policy **Qwen 3.5 35B**; the essay itself says "a language model".

## Environment

- Example prompt: *draw a peach hibiscus in watercolour*.
- Policy emits **complete JavaScript** for p5 + p5.brush.
- Puppeteer sandbox renders a PNG. No compile → no image → gate fails.
- Judge: separate VLM, pairwise against **two** images from the hand-rated pool. Prompt: *which of these is the better hibiscus watercolour?* Reward = win fraction.
- Optimiser: **GRPO**.

## Old reward (plateau ~0.65)

Nine signals: compile, uses-brush, length ramp (~3,000 token target, ~⅓ of total, dead by step 30), HPSv3 at 0.10, prompt adherence (GPT-5.4 + Gemini council), four quality judges. Quality + adherence correlated 0.85–0.95. Absolute 0–10 scores compressed near zero. Collapse: one 5-petal clip-art, padded code, rising scalar.

## New reward (climbed)

```
0.05  binary compile && uses p5.brush
0.05  binary length check
0.30  HPSv3
0.60  pairwise vs two pool refs
```

Same model, same data. Hit the old plateau 3× faster, kept climbing, code 13.5k → <2k tokens.

Not done: train a small RM on love/okay/nope (RLHF) so the pool is not queried every step.

## Pool construction

| Number | What |
| --- | --- |
| 1,664 | generations sorted by hand |
| 117 | love-tier |
| 266 | okay |
| 198 | supplements (thin colour slices) |
| 581 | refs used |
| 200 | GEPA iterations on the generator system prompt |
| 7 | shots on the taste judge |

All refs are **model-rendered**. Human paintings in this stack were too scarce.

Pipelines: AutoResearch (Opus 4.6, GPT-5.4, Gemini 3.1 Pro) vs reference photographs + VLM feedback; larger Gemini 3.1 Pro batch.

## GEPA lesson (prompt, not weights)

Dumping p5.brush docs taught the pre-RL model to call ghosts. Winning prompt: closed method list, no commentary. Post-training August code uses ~19 `brush.*` names (see paint-with-code allowlist) — still not the 59k README.

## Transfer warning

Pairwise-vs-pool improved *quality relative to the pool*. It did not invent a new subject class. Skills that "paint like Qwen after training" will hibiscus unless the human prompt fights that prior.

## Site / CV rule

Literature for notes on GRPO / circuit search / agent skills. **Not** a `/work` entry. **Not** Gyanateet's training result.
