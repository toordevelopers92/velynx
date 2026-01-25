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



