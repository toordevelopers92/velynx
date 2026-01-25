# Plugins

Velynx plugins are small, focused extensions that can generate additional utilities or components. A plugin is a TypeScript module that reads the same token structure and returns CSS strings.

## Write your first plugin

```ts
import type { FrameworkConfig } from '../framework.config';

export const glowBadgePlugin = (config: FrameworkConfig) => {
  const glow = config.tokens.glow.g2;
  return `@layer modules {\n  .vxc-badge.vxs-glow { box-shadow: ${glow}; }\n}`;
};
```

## How to run a plugin

Add your plugin output to the build script or concatenate it after `components-extended.css`.



