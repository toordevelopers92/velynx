# Motion

Velynx motion utilities use the `vxm-` prefix. Animations are kept subtle and short. When users request reduced motion, animations collapse to nearly instant transitions.

## Available motion classes

- `vxm-fade-1` uses the base fade/slide keyframes
- `vxm-glow-pulse` gently animates glow for callouts
- Utility variants: `__motion-ok` and `__motion-reduce` allow motion-specific overrides

## Example

```html
<div class="vxc-card vxm-fade-1">
  <h3 class="vxu-type-scale--t4">Arriving signal</h3>
</div>
```



