# Performance tuning

Velynx ships three CSS builds:

- `velynx.tokens.css` for tokens only
- `velynx.core.css` for minimal utilities + base components
- `velynx.extended.css` for the full set

## Purge strategy

If you use a bundler, configure your CSS purge step to keep any `vxu-`, `vxc-`, `vxs-`, `vxm-`, and `vxt-` classes you are using. Because Velynx class names are deterministic, you can safelist these prefixes.

## JS tree-shaking

Import only the modules you need:

```ts
import { Modal, ToastStack } from '@toordevelopersinc/velynx-js';
```

## Recent runtime optimizations

- Calendar rendering now uses `DocumentFragment` batching to reduce layout thrash.
- Weekday and month formatters are cached per calendar instance.
- Weekday headers render once instead of re-rendering every month navigation.
- Legacy class-name mismatches in JS modules were aligned with current `vxc-`/`vxm-` CSS naming for less style fallback overhead.



