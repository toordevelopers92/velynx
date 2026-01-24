# Responsive and RTL

## Responsive utilities

Use breakpoint prefixes to scope a utility:

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

Velynx uses logical properties for spacing utilities (`padding-inline`, `margin-inline`) where possible. For custom CSS, prefer logical properties like `margin-inline` and `inset-inline`.

If you must use physical left/right values, wrap them in an `[dir="ltr"]` or `[dir="rtl"]` selector.
