# Utility catalog

Velynx utilities use a grammar designed for legibility:

```
<family>-<variant>--<value>
```

Prefix families with `u-`. Examples:

- `u-space-in--s4` pads all sides
- `u-space-x--s3` pads inline axis
- `u-measure-w--c40` sets width to 40ch
- `u-tone-surface--2` sets glass background surface 2

## Prefix system

- Utilities: `u-`
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
