# Utility catalog

Velynx utilities share the `vxu-` prefix and come in two tiers:

- Micro utilities: property-level classes for layout, spacing, typography, color, effects, and interaction.
- Macro utilities: compositional helpers for flow, grids, glass, safe-area, and container queries.

## Micro utilities

```html
<div class="vxu-p-4 vxu-bg-surface-1 vxu-text-ink vxu-shadow-lg vxu-rounded-lg"></div>
<button class="vxu-px-4 vxu-py-2 vxu-bg-primary vxu-text-bg vxu-transition vxu-bg-accent-2__hover">Action</button>
<div class="vxu-grid vxu-grid-cols-1 vxu-grid-cols-3__at-m vxu-gap-4"></div>
```

## Macro utilities

```html
<div class="vxu-flow-stack--s4 vxu-glass--1 vxu-space-in--s5"></div>
<div class="vxu-cq vxu-flow-cluster--s2 vxu-space-gap--s2"></div>
<div class="vxu-safe-in--inline"></div>
```

## Variant suffixes

- Interaction: `__hover`, `__focus`, `__focus-visible`, `__active`, `__disabled`
- Group/peer: `__group-hover`, `__peer-checked` (use `.vxs-group` and `.vxs-peer`)
- ARIA/data: `__aria-expanded`, `__data-open`, `__data-closed`
- Theme/dir: `__theme-dark`, `__theme-light`, `__theme-contrast`, `__rtl`
- Responsive: `__at-s`, `__at-m`, `__at-l`, `__at-xl`, `__at-2xl`
- Container query: `__cq-c1`, `__cq-c2`, `__cq-c3`, `__cq-c4`
- Motion/print: `__motion-ok`, `__motion-reduce`, `__print`
- Accessibility contrast: `__forced`, `__contrast`

`__data-open` and `__data-closed` map to `[data-vx-state="open|closed"]`.

## Prefix system

- Utilities: `vxu-`
- Components: `vxc-`
- States/variants: `vxs-`
- Motion: `vxm-`
- Themes: `vxt-`

## Spacing

| Class | Result |
| --- | --- |
| `vxu-space-in--s4` | padding using space token s4 |
| `vxu-space-out--s2` | margin using space token s2 |
| `vxu-space-gap--s3` | gap for flex/grid |

## Layout

| Class | Result |
| --- | --- |
| `vxu-flow-stack--s4` | vertical flow with gap |
| `vxu-flow-row--s2` | horizontal flow with gap |
| `vxu-grid--2` | two-column grid |
| `vxu-container` | responsive centered container |

## Typography

| Class | Result |
| --- | --- |
| `vxu-type-scale--t4` | tokenized font-size |
| `vxu-font-mono` | monospace font family |
| `vxu-text-center` | text alignment |

## Effects

| Class | Result |
| --- | --- |
| `vxu-glass--1` | glass background + blur |
| `vxu-shadow-glow` | glowing box-shadow |
| `vxu-noise--fine` | lightweight noise overlay |

## Responsive variants

Use `__at-<breakpoint>` to scope a utility to a breakpoint.

```
<div class="vxu-grid-cols-2 vxu-grid-cols-4__at-l"></div>
```



