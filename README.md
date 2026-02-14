# Velynx

Velynx is a glassmorphism-first front-end framework with utilities, components, and small vanilla TypeScript modules for interactivity. It ships core and extended CSS builds plus ESM/UMD JavaScript.

## Packages

- `@toordevelopersinc/velynx` - CSS framework (tokens, core, extended)
- `@toordevelopersinc/velynx-js` - JS modules (modal, drawer, dropdown, tooltip, tabs, toast, accordion, popover, navbar, calendar, particle progress, image reveal)

## Major updates in this project upgrade

1. Single date selector in Calendar via `data-vx-selection="single"` (default behavior).
2. Multi date selector in Calendar via `data-vx-selection="multi"` and `data-vx-selected-dates`.
3. Date range selector in Calendar via `data-vx-selection="range"` and `data-vx-range-start` / `data-vx-range-end`.
4. Particle scatter/collapse loading bar design via `data-vx="particle-progress"` and `.vxc-progress-particles`.
5. New live feature demo page at `examples/live-demo/index.html`.
6. Modal animation upgrades with directional angles via `data-vx-angle` (including `random`).
7. Speed improvements in calendar rendering (fragment batching, formatter caching, reduced repeated rendering).
8. Cookie banner snippet styling via `.vxc-cookie-banner` and `.vxc-cookie-banner-actions`.
9. Docs/README updates to capture all enhancements.
10. Image display animation via `data-vx="image-reveal"` and `.vxc-image-reveal`.

## New feature snippets

### Calendar modes

```html
<div class="vxc-calendar" data-vx="calendar" data-vx-selection="single" data-vx-selected="2026-02-14"></div>
<div class="vxc-calendar" data-vx="calendar" data-vx-selection="multi" data-vx-selected-dates="2026-02-10,2026-02-14"></div>
<div class="vxc-calendar" data-vx="calendar" data-vx-selection="range" data-vx-range-start="2026-02-10" data-vx-range-end="2026-02-16"></div>
```

### Particle progress

```html
<div data-vx="particle-progress" data-vx-progress="62" data-vx-particle-count="18"></div>
```

### Modal angles

```html
<div class="vxc-modal" id="modal-a" data-vx="modal" data-vx-angle="top-right">
  <div class="vxc-modal-panel">...</div>
</div>
```

### Cookie banner snippet

```html
<aside class="vxc-cookie-banner vxs-open">
  <div>We use cookies to improve your experience.</div>
  <div class="vxc-cookie-banner-actions">
    <button class="vxc-button vxs-variant-solid">Accept</button>
    <button class="vxc-button">Decline</button>
  </div>
</aside>
```

### Image reveal animation

```html
<figure data-vx="image-reveal">
  <img src="..." alt="Preview" />
</figure>
```

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
pnpm docs:prepare
pnpm docs:build
pnpm docs:dev
```

### How docs are built

`pnpm docs:prepare` runs an automated pipeline:

1. Build latest framework outputs from `packages/core/dist` and `packages/js/dist`
2. Copy compiled CSS/JS into `packages/docs/docs/public/velynx`
3. Import every HTML page from `examples/` into docs demo assets
4. Generate docs demo pages and demos manifest automatically

Scripts:

- `scripts/prepare-docs.js`
- `scripts/sync-docs-assets.js`
- `scripts/import-examples.js`

### Example import pipeline

For each `examples/**/*.html`, the import script:

- Creates runnable demo at `packages/docs/docs/public/demos/<slug>/index.html`
- Rewrites framework asset paths for GitHub Pages-safe runtime paths
- Extracts HTML/CSS/JS source into `source.json`
- Generates docs page at `packages/docs/docs/demos/<slug>.md`
- Rebuilds demos landing page at `packages/docs/docs/demos/index.md`

## GitHub Pages deploy

GitHub Actions deployment is configured in:

- `.github/workflows/docs.yml`

On push to `main`, the workflow installs dependencies, builds docs, uploads the VitePress artifact, and deploys to GitHub Pages.

## Examples

Open the HTML files in `examples/` after building CSS and JS.

- `examples/live-demo/index.html` includes the full upgraded feature set in one page.

## Versioning and releases

Velynx follows semantic versioning. Bump versions in each package and then create a tag.

Release steps:

1. Update `CHANGELOG.md` and package versions.
2. Run `pnpm test` and `pnpm build`.
3. Run `scripts/package.ps1` to generate tarballs.
4. Publish with `pnpm -C packages/core publish --access public` and `pnpm -C packages/js publish --access public`.

## License

MIT
