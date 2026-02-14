# Install

## Package managers (npm, pnpm, yarn, bun)

```bash
pnpm add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
npm install @toordevelopersinc/velynx @toordevelopersinc/velynx-js
yarn add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
bun add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
```

```ts
import '@toordevelopersinc/velynx';
import { autoInit } from '@toordevelopersinc/velynx-js';

autoInit();
```

## CDN usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx/dist/velynx.extended.css" />
<script type="module">
  import { autoInit } from 'https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx-js/dist/velynx.esm.js';
  autoInit();
</script>
```

## NPM + bundlers

Velynx ships ESM by default, with a UMD build for legacy bundlers. Tree-shaking works on named imports from `@toordevelopersinc/velynx-js`.

```ts
import { Modal, Tabs, autoInit } from '@toordevelopersinc/velynx-js';

autoInit();
```

## Basic layout example

```html
<main class="vxu-container vxu-space-in--s6 vxu-flow-stack--s4">
  <header class="vxc-card">
    <h1 class="vxu-type-scale--t6">Ops Console</h1>
    <p class="vxu-tone-ink--mute">Built with Velynx utilities and components.</p>
  </header>
  <section class="vxc-feature-grid">
    <article class="vxc-feature-card">...</article>
    <article class="vxc-feature-card">...</article>
  </section>
</main>
```



