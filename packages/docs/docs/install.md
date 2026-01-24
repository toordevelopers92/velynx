# Install

## npm

```bash
pnpm add @toordevelopers92/velynx @toordevelopers92/velynx-js
```

```ts
import '@toordevelopers92/velynx';
import { autoInit } from '@toordevelopers92/velynx-js';

autoInit();
```

## CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@toordevelopers92/velynx/dist/velynx.extended.css" />
<script type="module">
  import { autoInit } from 'https://cdn.jsdelivr.net/npm/@toordevelopers92/velynx-js/dist/velynx.esm.js';
  autoInit();
</script>
```

## Bundlers

Velynx ships ESM by default, with a UMD build for legacy bundlers. Tree-shaking works on named imports from `@toordevelopers92/velynx-js`.
