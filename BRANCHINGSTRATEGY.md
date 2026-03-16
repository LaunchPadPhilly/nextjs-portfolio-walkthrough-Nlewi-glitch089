Branching Strategy
==================

Overview
--------

This project follows a simple Git branching model that works well for small teams and classroom workflows. The rules below are recommendations — your team can adapt them.

Branches
--------

- `main` (Production-ready):
  - Contains production-ready code. Protect this branch in GitHub (require PRs, code review, and passing CI).
  - Releases are tagged from `main` (e.g., `v1.0.0`).

- `develop` (Integration):
  - Integration branch for completed features and staging tests. CI runs validation on merges here.
  - Merge `develop` into `main` via a release PR when ready.

- `feature/*` (New features):
  - Naming: `feature/<short-description>` (e.g., `feature/add-projects-grid`).
  - Branch off `develop` and keep PRs small and focused. Rebase or merge `develop` frequently.

- `hotfix/*` (Emergency fixes):
  - Branch off `main` for urgent fixes. After release, merge back into `develop`.

Pull Request & Merge Rules
--------------------------

- PR Checklist:
  - Clear title and description with testing notes.
  - Link to an issue where applicable.
  - Local tests pass (`npm test`) and CI checks are green.
  - At least one approving review.

- Merge Strategy:
  - Prefer squash merges for feature branches to keep history readable.
  - Do not push directly to `main`; use PRs and ensure CI passes before merging.

Release & CI
-----------

- Create a release PR from `develop` to `main` once integration tests pass.
- Tag releases on `main` and deploy via your CI/CD pipeline.

Emergency Process
-----------------

- For urgent security or production issues, create `hotfix/*` from `main`, validate, deploy, and merge the fix back into `develop`.

Notes
-----

- Keep branch names short and descriptive.
- Use issue IDs in branch names if helpful (e.g., `feature/123-add-comments`).

