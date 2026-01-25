# Install

## npm

```bash
pnpm add @toordevelopersinc/velynx @toordevelopersinc/velynx-js
```

```ts
import '@toordevelopersinc/velynx';
import { autoInit } from '@toordevelopersinc/velynx-js';

autoInit();
```

## CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx/dist/velynx.extended.css" />
<script type="module">
  import { autoInit } from 'https://cdn.jsdelivr.net/npm/@toordevelopersinc/velynx-js/dist/velynx.esm.js';
  autoInit();
</script>
```

## Bundlers

Velynx ships ESM by default, with a UMD build for legacy bundlers. Tree-shaking works on named imports from `@toordevelopersinc/velynx-js`.
