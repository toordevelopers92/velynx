# Responsive and RTL

## Responsive utilities

Utilities use suffix-based breakpoints:

```html
<div class="vxu-grid vxu-grid-cols-1 vxu-grid-cols-3__at-m vxu-gap-4"></div>
```

Breakpoints are defined in `framework.config.ts` and compiled into the CSS.

## Container queries

Use `vxu-cq` to opt into container queries. If container queries are unavailable, layouts fall back to your media query utilities.

```html
<section class="vxu-cq"></section>
```

Container query variants use `__cq-*`:

```html
<section class="vxu-grid-cols-2 vxu-grid-cols-4__cq-c3"></section>
```

## RTL support

Velynx uses logical properties for spacing utilities (`padding-inline`, `margin-inline`) where possible. Use `__rtl` to scope utilities to RTL mode.

```html
<div class="vxu-text-left vxu-text-right__rtl"></div>
```

If you must use physical left/right values, wrap them in an `[dir="ltr"]` or `[dir="rtl"]` selector.



