# Component catalog

Components use the `vxc-` prefix. Variants are expressed with suffixes like `vxs-variant-solid` or state helpers like `vxs-disabled`.

## Button

```html
<button class="vxc-button">Ghost</button>
<button class="vxc-button vxs-variant-solid">Solid</button>
<button class="vxc-button vxs-variant-outline">Outline</button>
<button class="vxc-button vxs-variant-ghost">Bare</button>
<button class="vxc-button vxs-variant-link">Link</button>
<button class="vxc-button vxs-size-sm">Small</button>
<button class="vxc-button vxs-size-lg">Large</button>
<button class="vxc-button vxc-icon-button" aria-label="Settings">⚙</button>
```

## Button groups

```html
<div class="vxc-button-group">
  <button class="vxc-button">Left</button>
  <button class="vxc-button">Center</button>
  <button class="vxc-button">Right</button>
</div>
```

## Segmented control

```html
<div class="vxc-segmented">
  <button class="vxc-segmented-item vxs-active">Daily</button>
  <button class="vxc-segmented-item">Weekly</button>
  <button class="vxc-segmented-item">Monthly</button>
</div>
```

## Badge and chip

```html
<span class="vxc-badge">Beta</span>
<span class="vxc-chip"><span class="vxc-badge">A</span> Operator</span>
```

## Card

```html
<article class="vxc-card vxu-flow-stack--s3">
  <h3 class="vxu-type-scale--t4">Glass card</h3>
  <p class="vxu-tone-ink--mute">Content with blur.</p>
</article>
```

## Navbar + sidebar

```html
<nav class="vxc-navbar" data-vx="navbar">
  <div class="vxc-navbar-brand">Velynx</div>
  <button class="vxc-navbar-toggle" data-vx-toggle aria-expanded="false">Menu</button>
  <div class="vxc-navbar-menu" data-vx-menu id="vx-nav">
    <div class="vxc-navbar-links">
      <a href="#">Docs</a>
      <a href="#">Themes</a>
    </div>
    <div class="vxc-navbar-actions">
      <button class="vxc-button">Login</button>
      <button class="vxc-button vxs-variant-solid">Start</button>
    </div>
  </div>
</nav>
```

## Tables

```html
<table class="vxc-table">
  <thead><tr><th>Node</th><th>Status</th></tr></thead>
  <tbody><tr><td>NX-01</td><td>Online</td></tr></tbody>
</table>
```

## Forms

```html
<div class="vxc-field">
  <label for="email">Email</label>
  <input id="email" class="vxc-input" type="email" />
</div>
```

```html
<div class="vxc-form">
  <div class="vxc-form-row">
    <label class="vxc-label" for="name">Name</label>
    <input id="name" class="vxc-input" type="text" />
    <div class="vxc-help">Use your public name.</div>
  </div>
  <div class="vxc-form-row">
    <label class="vxc-label" for="code">Invite</label>
    <div class="vxc-input-group">
      <span class="vxc-input-addon">VX</span>
      <input id="code" class="vxc-input" type="text" />
    </div>
    <div class="vxc-error">Invalid code.</div>
  </div>
</div>
```

```html
<label class="vxc-label" for="volume">Volume</label>
<input id="volume" class="vxc-range" type="range" min="0" max="100" />
```

```html
<div class="vxc-file-drop">Drop files here or click to upload</div>
```

```html
<div class="vxc-tag-input">
  <span class="vxc-tag">Glass</span>
  <input type="text" placeholder="Add tag" />
</div>
```

```html
<div class="vxc-rating">
  <button class="vxc-rating-item vxs-active">★</button>
  <button class="vxc-rating-item vxs-active">★</button>
  <button class="vxc-rating-item">★</button>
  <button class="vxc-rating-item">★</button>
  <button class="vxc-rating-item">★</button>
</div>
```

```html
<div class="vxc-otp">
  <input class="vxc-input" maxlength="1" />
  <input class="vxc-input" maxlength="1" />
  <input class="vxc-input" maxlength="1" />
  <input class="vxc-input" maxlength="1" />
  <input class="vxc-input" maxlength="1" />
  <input class="vxc-input" maxlength="1" />
</div>
```

```html
<div class="vxc-validation-summary">
  <div>Fix the highlighted fields.</div>
</div>
```

## Hero

```html
<section class="vxc-hero">
  <div class="vxc-hero-eyebrow">Velynx OS</div>
  <h1 class="vxc-hero-title">Futuristic glass UI</h1>
  <p class="vxc-hero-subtitle">Build portals, dashboards, and apps with a neon-glass system.</p>
  <div class="vxc-hero-actions">
    <button class="vxc-button vxs-variant-solid">Get started</button>
    <button class="vxc-button">View docs</button>
  </div>
</section>
```

## Alerts

```html
<div class="vxc-alert vxs-tone-info">
  <div class="vxc-alert-title">Info</div>
  <p class="vxu-tone-ink--mute">This is an informational alert.</p>
</div>
```

## Stats

```html
<div class="vxc-stat-grid">
  <div class="vxc-stat">
    <div class="vxc-stat-value">42k</div>
    <div class="vxc-stat-label">Active users</div>
  </div>
  <div class="vxc-stat">
    <div class="vxc-stat-value">98%</div>
    <div class="vxc-stat-label">Uptime</div>
  </div>
</div>
```

## Feature grid

```html
<div class="vxc-feature-grid">
  <div class="vxc-feature-card">
    <div class="vxc-feature-icon">FX</div>
    <div class="vxc-feature-title">Neon glass</div>
    <p class="vxu-tone-ink--mute">Blurred panels with layered glow.</p>
  </div>
  <div class="vxc-feature-card">
    <div class="vxc-feature-icon">RX</div>
    <div class="vxc-feature-title">Token driven</div>
    <p class="vxu-tone-ink--mute">Design tokens for rapid theming.</p>
  </div>
</div>
```

## Pricing

```html
<div class="vxc-pricing-grid">
  <div class="vxc-pricing-card">
    <h3>Starter</h3>
    <div class="vxc-pricing-price">$0</div>
    <div class="vxc-pricing-period">Forever</div>
    <ul class="vxc-pricing-list">
      <li>Core utilities</li>
      <li>Community themes</li>
    </ul>
  </div>
  <div class="vxc-pricing-card vxs-featured">
    <h3>Studio</h3>
    <div class="vxc-pricing-price">$24</div>
    <div class="vxc-pricing-period">Per month</div>
    <ul class="vxc-pricing-list">
      <li>Premium components</li>
      <li>Theme marketplace</li>
    </ul>
  </div>
</div>
```

## CTA

```html
<div class="vxc-cta">
  <div>
    <div class="vxc-hero-eyebrow">Ready?</div>
    <h3 class="vxu-type-scale--t4">Launch your glass portal</h3>
  </div>
  <button class="vxc-button vxs-variant-solid">Deploy</button>
</div>
```

## Calendar (JS)

```html
<div class="vxc-calendar" data-vx="calendar" data-vx-selected="2026-01-25"></div>
```

## Menu

```html
<div class="vxc-menu">
  <div class="vxc-menu-item">Dashboard</div>
  <div class="vxc-menu-item">Settings</div>
  <div class="vxc-menu-divider"></div>
  <div class="vxc-menu-item">Log out</div>
</div>
```

## Key/Value

```html
<div class="vxc-key-value">
  <div class="vxc-key">Status</div>
  <div class="vxc-value">Online</div>
  <div class="vxc-key">Region</div>
  <div class="vxc-value">us-east</div>
</div>
```

## Spinner

```html
<div class="vxc-spinner" aria-label="Loading"></div>
```

## Empty state

```html
<div class="vxc-empty-state">
  <div class="vxc-hero-eyebrow">No data</div>
  <p class="vxu-tone-ink--mute">Add your first entry to populate the grid.</p>
  <button class="vxc-button vxs-variant-solid">Create</button>
</div>
```

## Code block

```html
<pre class="vxc-code-block">pnpm add @toordevelopersinc/velynx</pre>
```

## Footer

```html
<footer class="vxc-footer">
  <div class="vxc-footer-grid">
    <div>
      <div class="vxc-navbar-brand">Velynx</div>
      <p class="vxu-tone-ink--mute">Glass UI system for web and mobile.</p>
    </div>
    <div class="vxc-footer-links">
      <a href="#">Docs</a>
      <a href="#">Themes</a>
      <a href="#">Support</a>
    </div>
  </div>
</footer>
```

## App shell

```html
<div class="vxc-app-shell">
  <header class="vxc-app-topbar">
    <div class="vxc-navbar-brand">Velynx</div>
    <button class="vxc-button">Invite</button>
  </header>
  <div class="vxc-app-body">
    <aside class="vxc-app-sidebar">
      <div class="vxc-menu-item">Overview</div>
      <div class="vxc-menu-item">Projects</div>
    </aside>
    <main class="vxc-app-main">
      <div class="vxc-panel">Main content</div>
    </main>
  </div>
</div>
```

## Tabs (JS)

```html
<div class="vxc-tabs" data-vx="tabs">
  <div class="vxu-flow-row--s2">
    <button data-vx-tab="alpha">Alpha</button>
    <button data-vx-tab="beta">Beta</button>
  </div>
  <div data-vx-panel="alpha">Alpha panel</div>
  <div data-vx-panel="beta">Beta panel</div>
</div>
```

## Accordion (JS)

```html
<div class="vxc-accordion" data-vx="accordion">
  <div class="vxc-accordion-item">
    <button class="vxc-accordion-trigger" data-vx-trigger="a1">Signal A</button>
    <div class="vxc-accordion-panel" data-vx-panel="a1">Panel A</div>
  </div>
</div>
```

## Modal (JS)

```html
<button class="vxc-button" data-vx-open="modal-x">Open</button>
<div class="vxc-modal" id="modal-x" data-vx="modal">
  <div class="vxc-modal-panel">
    <button class="vxc-button" data-vx-close="modal-x">Close</button>
  </div>
</div>
```

## Dropdown (JS)

```html
<div class="vxc-dropdown" data-vx="dropdown">
  <button class="vxc-button" data-vx-toggle>Menu</button>
  <div class="vxc-dropdown-menu" data-vx-menu>
    <div class="vxc-list-item">Orbit</div>
  </div>
</div>
```

## Toasts (JS)

```html
<button class="vxc-button" data-vx-toast="signals" data-vx-toast-msg="Ping received">Notify</button>
<div id="signals" data-vx="toast-stack" class="vxu-flow-stack--s2"></div>
```

## Tooltip (JS)

```html
<button class="vxc-button" data-vx-tooltip="Calibrate">Hover</button>
```

## Icons

Velynx does not ship third-party icons. Use the demo sprite in `packages/core/src/icons.svg`
or define your own symbols and reference them with `<use>`.

```html
<svg width="24" height="24" aria-hidden="true"><use href="#vx-icon-spark"></use></svg>
```



