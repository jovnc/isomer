# Isomer Next Technical Wiki

This directory contains a dependency-free static HTML technical wiki for the
Isomer Next monorepo.

## View locally

Open `docs/technical-wiki/index.html` directly in a browser, or serve the repo
root with any static file server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080/docs/technical-wiki/
```

## Contents

- `index.html` - structured wiki content.
- `styles.css` - Stripe-style documentation layout, sidebar, cards, tables, and
  responsive behavior.
- `wiki.js` - section highlighting, search/filtering, keyboard shortcut, and
  copyable section headings.

No npm package, build step, external CDN, or generated artifact is required.

## Source areas summarized

The wiki is based on repository inspection across:

- `apps/studio` - Next.js Studio CMS, tRPC API, feature modules, auth,
  publishing, and tests.
- `packages/components` - published-site renderer, JSON schemas, templates,
  Storybook, and component conventions.
- `packages/db` - Prisma schema, migrations, Kysely types, and DB helpers.
- `packages/pgboss`, `packages/logging`, `packages/validators` - shared runtime
  packages.
- `tooling/*` - TypeScript, Oxlint, Storybook, static template, publishing, and
  operational scripts.
- `.github/*` - CI, deploy, Chromatic, CodeQL, Dependabot, and PR template
  configuration.

## Maintenance notes

Update the wiki when changing:

- public package boundaries or exports,
- Studio router/module layout,
- database ownership or migration process,
- publishing or deployment flow,
- local development setup,
- CI/test commands,
- authentication, permissions, audit logging, or external integrations.
