# Component catalog

Components use the `c-` prefix. Variants are expressed with suffixes like `c-button--solid` or state helpers like `s-disabled`.

## Button

```html
<button class="c-button">Ghost</button>
<button class="c-button c-button--solid">Solid</button>
```

## Badge and chip

```html
<span class="c-badge">Beta</span>
<span class="c-chip"><span class="c-badge">A</span> Operator</span>
```

## Card

```html
<article class="c-card u-flow-stack--s3">
  <h3 class="u-type-scale--t4">Glass card</h3>
  <p class="u-tone-ink--mute">Content with blur.</p>
</article>
```

## Navbar + sidebar

```html
<nav class="c-navbar">
  <div>Velynx</div>
  <div class="u-flow-row--s2">
    <button class="c-button">Docs</button>
    <button class="c-button c-button--solid">Start</button>
  </div>
</nav>
```

## Tables

```html
<table class="c-table">
  <thead><tr><th>Node</th><th>Status</th></tr></thead>
  <tbody><tr><td>NX-01</td><td>Online</td></tr></tbody>
</table>
```

## Forms

```html
<div class="c-field">
  <label for="email">Email</label>
  <input id="email" class="c-input" type="email" />
</div>
```

## Tabs (JS)

```html
<div class="c-tabs" data-vx="tabs">
  <div class="u-flow-row--s2">
    <button data-vx-tab="alpha">Alpha</button>
    <button data-vx-tab="beta">Beta</button>
  </div>
  <div data-vx-panel="alpha">Alpha panel</div>
  <div data-vx-panel="beta">Beta panel</div>
</div>
```

## Accordion (JS)

```html
<div class="c-accordion" data-vx="accordion">
  <div class="c-accordion-item">
    <button class="c-accordion-trigger" data-vx-trigger="a1">Signal A</button>
    <div class="c-accordion-panel" data-vx-panel="a1">Panel A</div>
  </div>
</div>
```

## Modal (JS)

```html
<button class="c-button" data-vx-open="modal-x">Open</button>
<div class="c-modal" id="modal-x" data-vx="modal">
  <div class="c-modal-panel">
    <button class="c-button" data-vx-close="modal-x">Close</button>
  </div>
</div>
```

## Dropdown (JS)

```html
<div class="c-dropdown" data-vx="dropdown">
  <button class="c-button" data-vx-toggle>Menu</button>
  <div class="c-dropdown-menu" data-vx-menu>
    <div class="c-list-item">Orbit</div>
  </div>
</div>
```

## Toasts (JS)

```html
<button class="c-button" data-vx-toast="signals" data-vx-toast-msg="Ping received">Notify</button>
<div id="signals" data-vx="toast-stack" class="u-flow-stack--s2"></div>
```

## Tooltip (JS)

```html
<button class="c-button" data-vx-tooltip="Calibrate">Hover</button>
```

## Icons

Velynx does not ship third-party icons. Use the demo sprite in `packages/core/src/icons.svg`
or define your own symbols and reference them with `<use>`.

```html
<svg width="24" height="24" aria-hidden="true"><use href="#vx-icon-spark"></use></svg>
```
