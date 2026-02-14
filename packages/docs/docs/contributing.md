# Contributing

We welcome issues and pull requests that improve performance, accessibility, or documentation.
Read `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` in the repository root before submitting changes.

## Docs build workflow

The docs site is built from latest compiled framework output:

```bash
pnpm docs:build
```

That command runs:

1. Framework CSS/JS build
2. Docs asset sync into `packages/docs/docs/public/velynx/`
3. Example import pipeline from `examples/`
4. VitePress site build

## Add a new example demo

1. Add a runnable HTML page under `examples/<name>/index.html` (or any `.html` in `examples/`).
2. Re-run docs preparation:

```bash
pnpm docs:prepare
```

3. Generated outputs:
- `packages/docs/docs/public/demos/<slug>/index.html` runnable demo
- `packages/docs/docs/public/demos/<slug>/source.json` extracted source
- `packages/docs/docs/demos/<slug>.md` documentation page
- `packages/docs/docs/demos/index.md` demos landing page

## Automation scripts

- `scripts/import-examples.js`: imports all `/examples` pages into docs demos with source extraction and path rewriting.
- `scripts/sync-docs-assets.js`: copies latest compiled Velynx assets into docs public folder.
- `scripts/prepare-docs.js`: orchestrates full docs preparation pipeline.



