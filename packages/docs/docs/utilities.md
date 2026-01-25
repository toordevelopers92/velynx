# Utility catalog

Velynx ships two utility systems:

- Atomic utilities (recommended): `p-4`, `text-primary`, `bg-surface-2`, `rounded-lg`, `shadow-lg`
- Legacy utilities (still supported): `u-space-in--s4`, `u-measure-w--c40`

## Atomic utilities

Atomic utilities follow a compact, predictable grammar inspired by functional CSS.

```html
<div class="p-4 bg-surface-1 text-ink shadow-lg rounded-lg"></div>
<button class="px-4 py-2 bg-primary text-bg hover:bg-accent-2 transition">Action</button>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"></div>
```

### Variants

- Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- States: `hover:`, `focus:`, `focus-visible:`, `active:`, `disabled:`
- Group/peer: `group-hover:`, `peer-checked:`
- ARIA/data: `aria-expanded:`, `data-state-open:`
- Theme/dir: `dark:`, `contrast:`, `rtl:`
- Motion: `motion-safe:`, `motion-reduce:`

## Legacy utilities

Legacy utilities use a grammar designed for legibility:

```
<family>-<variant>--<value>
```

Prefix families with `u-`. Examples:

- `u-space-in--s4` pads all sides
- `u-space-x--s3` pads inline axis
- `u-measure-w--c40` sets width to 40ch
- `u-tone-surface--2` sets glass background surface 2

## Prefix system

- Atomic utilities have no prefix.
- Legacy utilities: `u-`
- Components: `c-`
- States: `s-`
- Motion: `m-`
- Themes: `t-`

## Spacing

| Class | Result |
| --- | --- |
| `u-space-in--s4` | padding using space token s4 |
| `u-space-out--s2` | margin using space token s2 |
| `u-space-gap--s3` | gap for flex/grid |

## Layout

| Class | Result |
| --- | --- |
| `u-flow-stack--s4` | vertical flow with gap |
| `u-flow-row--s2` | horizontal flow with gap |
| `u-grid--2` | two-column grid |
| `u-container` | responsive centered container |

## Typography

| Class | Result |
| --- | --- |
| `u-type-scale--t4` | font-size token |
| `u-tone-ink--mute` | muted text color |

## Effects

| Class | Result |
| --- | --- |
| `u-glass--1` | glass background + blur |
| `u-glow--g2` | glowing box-shadow |
| `u-noise--fine` | lightweight noise overlay |

## Responsive variants

Use `u-at-<breakpoint>--` to scope a utility to a breakpoint.

```
<div class="u-grid--2 u-at-l--grid--3"></div>
```
