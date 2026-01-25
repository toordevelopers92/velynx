# Velynx

Velynx is a glassmorphism-first front-end framework with utilities, components, and small vanilla TypeScript modules for interactivity. It ships core and extended CSS builds plus ESM/UMD JavaScript.

## Packages

- `@toordevelopersinc/velynx` - CSS framework (tokens, core, extended)
- `@toordevelopersinc/velynx-js` - JS modules (modal, drawer, dropdown, tooltip, tabs, toast, accordion, popover, navbar, calendar)

## Class grammar

Utilities use the `vxu-` prefix and come in two flavors: macro layouts (flow, grid, glass) and micro utilities that mirror CSS properties.

Examples:

- `vxu-space-in--s4` padding using a token
- `vxu-grid-cols-3` three column grid
- `vxu-text-primary` primary text color
- `vxu-p-4__at-m` responsive spacing variant

Components use `vxc-`, states and variants use `vxs-`, motion helpers use `vxm-`, and themes use `vxt-`.

Variants are suffix-based: `__hover`, `__focus-visible`, `__at-m`, `__theme-contrast`, `__motion-reduce`, `__print`.

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



