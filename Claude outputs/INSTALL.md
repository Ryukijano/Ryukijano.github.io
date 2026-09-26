# Where these files go

Copy this tree into the repo root on `cursor/hall-cook-a347`. Four files, three
of which are thin adapters over one source of truth.

```
ryukijano.github.io/
├── AGENTS.md                                         ← new, repo root
├── .cursor/rules/paper-ink.mdc                       ← new
└── .opencode/skills/paper-ink/
    ├── SKILL.md                                      ← new
    └── references/route-shapes.md                    ← new
```

`sections.css` is not a file to copy — paste its contents into
`src/index.css`, after the work-catalogue block. It defines the classes the
five new route shapes use and introduces no new token.

## Who reads what

| tool | reads | notes |
|---|---|---|
| **OpenCode** | `.opencode/skills/**/SKILL.md` | your existing convention, alongside `visual-system`, `humanizer`, `site-gates` |
| **Cursor** | `.cursor/rules/*.mdc` | auto-attaches on the globs in the frontmatter — `src/**`, `DESIGN.md`. Also reads `AGENTS.md`. |
| **Antigravity** | `AGENTS.md` | the root file is the portable one; it points at the skill for detail |
| **Claude Code / Codex / Gemini CLI** | `AGENTS.md` | same file |
| **Windsurf** | `AGENTS.md`, or mirror the `.mdc` into `.windsurf/rules/` | the `.mdc` body is plain markdown, so it copies across unchanged |

The substance lives in `SKILL.md` and `references/route-shapes.md`. `AGENTS.md`
and the `.mdc` are short and point at them, so there is one place to edit when
a rule changes — keep it that way rather than letting the three drift.

## Verify it took

**Cursor** — open `src/index.css`, then check the rule appears under the
context pill in the chat pane. If it does not, the globs did not match; widen
them or set `alwaysApply: true`.

**Antigravity** — ask it "what is `--color-washi-deep` for?". Right answer: a
ground only, because ink-muted reaches 4.38 on it and fails AA. If it
paraphrases without that number, it has not read `AGENTS.md`.

**OpenCode** — the skill should list alongside `visual-system`. Note that
`visual-system` describes the **Material 3 lineage** on the other branches, not
this one. On `cursor/hall-cook-a347` the two contradict each other: one says
per-lane themes with dark variants, the other says no dark mode, permanently.
Whichever branch you settle on, delete the skill that does not apply to it —
an agent holding both will produce a page that is half of each.

## One more source

Everything here is also in the design system artifact, which serves
`project/README.md`, `project/tokens.json`, a compiled `project/tokens.css`,
and a live preview plus written guidelines for all twenty-two components. An
agent that can read a claude.ai artifact can pull from it directly; the files
in this bundle exist because Cursor and Antigravity cannot.
