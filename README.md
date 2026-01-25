# Velynx

Velynx is a glassmorphism-first front-end framework with utilities, components, and small vanilla TypeScript modules for interactivity. It ships core and extended CSS builds plus ESM/UMD JavaScript.

## Packages

- `@toordevelopersinc/velynx` - CSS framework (tokens, core, extended)
- `@toordevelopersinc/velynx-js` - JS modules (modal, drawer, dropdown, tooltip, tabs, toast, accordion, popover, navbar, calendar)

## Class grammar

Atomic utilities use short class names like `p-4`, `text-primary`, and `grid-cols-3`. Legacy utilities are still available with `u-<family>-<variant>--<value>`.

Examples:

- `p-4` padding
- `text-primary` color
- `bg-surface-2` glass background
- `sm:grid-cols-3` responsive variant

Component classes use `c-` and states use `s-`. Motion classes use `m-` and theme classes use `t-`.

## Quick start

```bash
pnpm install
pnpm build
pnpm -C packages/core build:css
pnpm -C packages/js build
```

```html
<link rel="stylesheet" href="./packages/core/dist/velynx.extended.css" />
<script type="module">
  import { autoInit } from './packages/js/dist/velynx.esm.js';
  autoInit();
</script>
```

## Docs

```bash
pnpm docs:build
pnpm -C packages/docs docs:dev
```

## Examples

Open the HTML files in `examples/` after building CSS and JS.

## Versioning and releases

Velynx follows semantic versioning. Bump versions in each package and then create a tag.

Release steps:

1. Update `CHANGELOG.md` and package versions.
2. Run `pnpm test` and `pnpm build`.
3. Run `scripts/package.ps1` to generate tarballs.
4. Publish with `pnpm -C packages/core publish --access public` and `pnpm -C packages/js publish --access public`.

## License

MIT
