# Responsive and RTL

## Responsive utilities

Atomic utilities use breakpoint prefixes:

```html
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"></div>
```

Legacy utilities use `u-at-` prefixes:

```html
<div class="u-grid--2 u-at-l--grid--3"></div>
```

Breakpoints are defined in `framework.config.ts` and compiled into the CSS.

## Container queries

Use `u-cq` to opt into container queries. If container queries are unavailable, layouts fall back to your media query utilities.

```html
<section class="u-cq"></section>
```

## RTL support

Velynx uses logical properties for spacing utilities (`padding-inline`, `margin-inline`) where possible. Atomic utilities also support an `rtl:` variant.

```html
<div class="text-left rtl:text-right"></div>
```

If you must use physical left/right values, wrap them in an `[dir="ltr"]` or `[dir="rtl"]` selector.
