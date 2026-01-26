# Velynx

Velynx is a glassmorphism-first front-end framework with utilities, components, and small vanilla TypeScript modules for interactivity. It ships core and extended CSS builds plus ESM/UMD JavaScript.

## Packages

- `@toordevelopersinc/velynx` - CSS framework (tokens, core, extended)
- `@toordevelopersinc/velynx-js` - JS modules (modal, drawer, dropdown, tooltip, tabs, toast, accordion, popover, navbar, calendar)

## Install (npm, pnpm, yarn, bun)

```bash
pnpm add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
npm install @toordevelopersinc/velynx @toordevelopersinc/velynx-js
yarn add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
bun add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
```

## Use with bundlers

### CSS

```css
@import '@toordevelopersinc/velynx';
```

```css
@import '@toordevelopersinc/velynx/core';
@import '@toordevelopersinc/velynx/tokens';
```

### JS

```ts
import { autoInit, Modal } from '@toordevelopersinc/velynx-js';

autoInit();
```

Auto-init also runs when `<html data-vx-auto>` is present.

## CDN and direct links

### jsDelivr (npm CDN)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx@0.2.7/dist/velynx.extended.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx-js@0.2.7/dist/velynx.umd.js"></script>
<script>
  Velynx.autoInit();
</script>
```

```html
<script type="module">
  import { autoInit } from 'https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx-js@0.2.7/dist/velynx.esm.js';
  autoInit();
</script>
```

Swap `@0.2.7` with `@latest` or a pinned version tag for stability.

Other CSS bundles:

- `https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx@0.2.7/dist/velynx.core.min.css`
- `https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx@0.2.7/dist/velynx.tokens.min.css`

### UNPKG (npm CDN)

- `https://unpkg.com/@toordevelopersinc/velynx@0.2.7/dist/velynx.extended.min.css`
- `https://unpkg.com/@toordevelopersinc/velynx-js@0.2.7/dist/velynx.umd.js`
- `https://unpkg.com/@toordevelopersinc/velynx-js@0.2.7/dist/velynx.esm.js`

### GitHub CDN (jsDelivr/gh)

- `https://cdn.jsdelivr.net/gh/toordevelopers92/velynx@v0.2.7/packages/core/dist/velynx.extended.min.css`
- `https://cdn.jsdelivr.net/gh/toordevelopers92/velynx@v0.2.7/packages/core/dist/velynx.core.min.css`
- `https://cdn.jsdelivr.net/gh/toordevelopers92/velynx@v0.2.7/packages/core/dist/velynx.tokens.min.css`
- `https://cdn.jsdelivr.net/gh/toordevelopers92/velynx@v0.2.7/packages/js/dist/velynx.umd.js`
- `https://cdn.jsdelivr.net/gh/toordevelopers92/velynx@v0.2.7/packages/js/dist/velynx.esm.js`

Pin to a tag like `v0.2.7` for stability.

### GitHub (source + self-host)

```bash
git clone https://github.com/toordevelopers92/velynx.git
cd velynx
pnpm install
pnpm build
```

Then serve the built files from `packages/core/dist` and `packages/js/dist`:

```html
<link rel="stylesheet" href="/assets/velynx.extended.min.css" />
<script src="/assets/velynx.umd.js"></script>
```

## Class grammar

Utilities use the `vxu-` prefix and come in two flavors: macro layouts (flow, grid, glass) and micro utilities that mirror CSS properties.

Examples:

- `vxu-space-in--s4` padding using a token
- `vxu-grid-cols-3` three column grid
- `vxu-text-primary` primary text color
- `vxu-p-4__at-m` responsive spacing variant

Components use `vxc-`, states and variants use `vxs-`, motion helpers use `vxm-`, and themes use `vxt-`.

Variants are suffix-based: `__hover`, `__focus-visible`, `__at-m`, `__theme-contrast`, `__motion-reduce`, `__print`.

## Local development

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
