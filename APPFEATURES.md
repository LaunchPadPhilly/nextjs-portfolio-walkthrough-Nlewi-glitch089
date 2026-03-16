Project Features
================

This repository is a Next.js portfolio starter tailored for coursework. It provides the minimal pages, layout, and developer tooling students need to build a personal portfolio site.

Core Features
-------------

- Next.js App Router project scaffold (`app/`), with example pages: Home, About, Projects, Contact
- Reusable components: `Navbar`, `Footer`, and small UI helpers (in `app/components/`)
- Responsive styles with Tailwind CSS and a token file for shared design variables
- Optional Prisma setup for projects that need a database (`prisma/schema.prisma`)
- Docker + `docker-compose.yml` for local integration (Postgres + app) and CI smoke checks
- GitHub Actions workflow for CI (`.github/workflows/ci.yml`) that runs smoke/tests
- Test harness (Vitest) and classroom validator tests in `tests/`

Technical Requirements / Notes
-----------------------------

- Database: If you use a Postgres backend, set `DATABASE_URL` or the `POSTGRES_*` secrets for compose/CI. See `SECRETS.md`.
- Secrets: Local helper files live in `secrets/` (not for production). Use environment variables or secret managers for production deployments.
- CI: The repository includes a CI workflow that runs on `push` and `pull_request`. Ensure tests pass locally with `npm test` before pushing.

Developer-facing Notes
----------------------

- Run locally: `npm ci && npm run dev` (or `docker compose up --build` to run the DB + app)
- Run tests: `npm test` (Vitest)
- Use `next/image` and `next/link` where required by the classroom tests
- Keep commits focused and include a descriptive message; CI requires passing tests for merging to protected branches

Extending the Starter
---------------------

Add features like authentication, persistence, and CMS integrations as needed. If you add Prisma migrations, commit the SQL/migration files and update CI secrets so smoke tests can run against a DB.

