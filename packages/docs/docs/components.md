# Component catalog

Components use the `c-` prefix. Variants are expressed with suffixes like `c-button--solid` or state helpers like `s-disabled`.

## Button

```html
<button class="c-button">Ghost</button>
<button class="c-button c-button--solid">Solid</button>
<button class="c-button c-button--outline">Outline</button>
<button class="c-button c-button--ghost">Bare</button>
<button class="c-button c-button--link">Link</button>
<button class="c-button c-button--sm">Small</button>
<button class="c-button c-button--lg">Large</button>
<button class="c-button c-icon-button" aria-label="Settings">⚙</button>
```

## Button groups

```html
<div class="c-button-group">
  <button class="c-button">Left</button>
  <button class="c-button">Center</button>
  <button class="c-button">Right</button>
</div>
```

## Segmented control

```html
<div class="c-segmented">
  <button class="c-segmented-item s-active">Daily</button>
  <button class="c-segmented-item">Weekly</button>
  <button class="c-segmented-item">Monthly</button>
</div>
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
<nav class="c-navbar" data-vx="navbar">
  <div class="c-navbar-brand">Velynx</div>
  <button class="c-navbar-toggle" data-vx-toggle aria-expanded="false">Menu</button>
  <div class="c-navbar-menu" data-vx-menu id="vx-nav">
    <div class="c-navbar-links">
      <a href="#">Docs</a>
      <a href="#">Themes</a>
    </div>
    <div class="c-navbar-actions">
      <button class="c-button">Login</button>
      <button class="c-button c-button--solid">Start</button>
    </div>
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

```html
<div class="c-form">
  <div class="c-form-row">
    <label class="c-label" for="name">Name</label>
    <input id="name" class="c-input" type="text" />
    <div class="c-help">Use your public name.</div>
  </div>
  <div class="c-form-row">
    <label class="c-label" for="code">Invite</label>
    <div class="c-input-group">
      <span class="c-input-addon">VX</span>
      <input id="code" class="c-input" type="text" />
    </div>
    <div class="c-error">Invalid code.</div>
  </div>
</div>
```

```html
<label class="c-label" for="volume">Volume</label>
<input id="volume" class="c-range" type="range" min="0" max="100" />
```

```html
<div class="c-file-drop">Drop files here or click to upload</div>
```

```html
<div class="c-tag-input">
  <span class="c-tag">Glass</span>
  <input type="text" placeholder="Add tag" />
</div>
```

```html
<div class="c-rating">
  <button class="c-rating-item s-active">★</button>
  <button class="c-rating-item s-active">★</button>
  <button class="c-rating-item">★</button>
  <button class="c-rating-item">★</button>
  <button class="c-rating-item">★</button>
</div>
```

```html
<div class="c-otp">
  <input class="c-input" maxlength="1" />
  <input class="c-input" maxlength="1" />
  <input class="c-input" maxlength="1" />
  <input class="c-input" maxlength="1" />
  <input class="c-input" maxlength="1" />
  <input class="c-input" maxlength="1" />
</div>
```

```html
<div class="c-validation-summary">
  <div>Fix the highlighted fields.</div>
</div>
```

## Hero

```html
<section class="c-hero">
  <div class="c-hero-eyebrow">Velynx OS</div>
  <h1 class="c-hero-title">Futuristic glass UI</h1>
  <p class="c-hero-subtitle">Build portals, dashboards, and apps with a neon-glass system.</p>
  <div class="c-hero-actions">
    <button class="c-button c-button--solid">Get started</button>
    <button class="c-button">View docs</button>
  </div>
</section>
```

## Alerts

```html
<div class="c-alert c-alert--info">
  <div class="c-alert-title">Info</div>
  <p class="u-tone-ink--mute">This is an informational alert.</p>
</div>
```

## Stats

```html
<div class="c-stat-grid">
  <div class="c-stat">
    <div class="c-stat-value">42k</div>
    <div class="c-stat-label">Active users</div>
  </div>
  <div class="c-stat">
    <div class="c-stat-value">98%</div>
    <div class="c-stat-label">Uptime</div>
  </div>
</div>
```

## Feature grid

```html
<div class="c-feature-grid">
  <div class="c-feature-card">
    <div class="c-feature-icon">FX</div>
    <div class="c-feature-title">Neon glass</div>
    <p class="u-tone-ink--mute">Blurred panels with layered glow.</p>
  </div>
  <div class="c-feature-card">
    <div class="c-feature-icon">RX</div>
    <div class="c-feature-title">Token driven</div>
    <p class="u-tone-ink--mute">Design tokens for rapid theming.</p>
  </div>
</div>
```

## Pricing

```html
<div class="c-pricing-grid">
  <div class="c-pricing-card">
    <h3>Starter</h3>
    <div class="c-pricing-price">$0</div>
    <div class="c-pricing-period">Forever</div>
    <ul class="c-pricing-list">
      <li>Core utilities</li>
      <li>Community themes</li>
    </ul>
  </div>
  <div class="c-pricing-card s-featured">
    <h3>Studio</h3>
    <div class="c-pricing-price">$24</div>
    <div class="c-pricing-period">Per month</div>
    <ul class="c-pricing-list">
      <li>Premium components</li>
      <li>Theme marketplace</li>
    </ul>
  </div>
</div>
```

## CTA

```html
<div class="c-cta">
  <div>
    <div class="c-hero-eyebrow">Ready?</div>
    <h3 class="u-type-scale--t4">Launch your glass portal</h3>
  </div>
  <button class="c-button c-button--solid">Deploy</button>
</div>
```

## Calendar (JS)

```html
<div class="c-calendar" data-vx="calendar" data-vx-selected="2026-01-25"></div>
```

## Menu

```html
<div class="c-menu">
  <div class="c-menu-item">Dashboard</div>
  <div class="c-menu-item">Settings</div>
  <div class="c-menu-divider"></div>
  <div class="c-menu-item">Log out</div>
</div>
```

## Key/Value

```html
<div class="c-key-value">
  <div class="c-key">Status</div>
  <div class="c-value">Online</div>
  <div class="c-key">Region</div>
  <div class="c-value">us-east</div>
</div>
```

## Spinner

```html
<div class="c-spinner" aria-label="Loading"></div>
```

## Empty state

```html
<div class="c-empty-state">
  <div class="c-hero-eyebrow">No data</div>
  <p class="u-tone-ink--mute">Add your first entry to populate the grid.</p>
  <button class="c-button c-button--solid">Create</button>
</div>
```

## Code block

```html
<pre class="c-code-block">pnpm add @toordevelopersinc/velynx</pre>
```

## Footer

```html
<footer class="c-footer">
  <div class="c-footer-grid">
    <div>
      <div class="c-navbar-brand">Velynx</div>
      <p class="u-tone-ink--mute">Glass UI system for web and mobile.</p>
    </div>
    <div class="c-footer-links">
      <a href="#">Docs</a>
      <a href="#">Themes</a>
      <a href="#">Support</a>
    </div>
  </div>
</footer>
```

## App shell

```html
<div class="c-app-shell">
  <header class="c-app-topbar">
    <div class="c-navbar-brand">Velynx</div>
    <button class="c-button">Invite</button>
  </header>
  <div class="c-app-body">
    <aside class="c-app-sidebar">
      <div class="c-menu-item">Overview</div>
      <div class="c-menu-item">Projects</div>
    </aside>
    <main class="c-app-main">
      <div class="c-panel">Main content</div>
    </main>
  </div>
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
