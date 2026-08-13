# Downstream Handoff

This directory is the entry point for another agent continuing the portfolio work.

## Provenance

- Repository: `Ryukijano/Ryukijano.github.io`
- Working branch: `feat/portfolio-rebuild`
- Base commit at handoff: `d404d9147058885b83536c97fc4116f37bb6039b`
- Default branch: `main`
- Deployment workflow: `.github/workflows/deploy.yml`

The local workspace was reconstructed by cloning the GitHub branch because the previous workspace snapshot contained an empty `website_revamp` directory and did not mount the historical `H:` source path. The branch itself is complete enough to build and contains the referenced support script and assets.

## Read First

1. [ARCHITECTURE.md](ARCHITECTURE.md) for the runtime structure and interaction model.
2. [ASSETS.md](ASSETS.md) for stable media locations and asset handling rules.
3. [VALIDATION.md](VALIDATION.md) for verification commands and known limitations.
4. [../plan.md](../plan.md) for the remaining product and engineering decisions.

## Working Rules

- Keep the three persona identities distinct when changing typography, color, content, or motion.
- Prefer assets under `public/assets/images/` for public URLs such as `/assets/images/profile-avatar.png`.
- Keep `public/resumes/` paths aligned with the links in `src/App.jsx`.
- Do not delete `legacy/` while comparing or migrating content without an explicit replacement plan.
- Run lint and build before pushing changes.

