# Velynx In Action

This page is a production-style implementation that demonstrates Velynx features working together:
layout, utilities, components, interactivity modules, theming, accessibility, and responsive behavior.

## 1. Navigation + layout

<nav class="vxc-navbar" data-vx="navbar">
  <div class="vxc-navbar-brand">Velynx Docs App</div>
  <button class="vxc-navbar-toggle" data-vx-toggle aria-expanded="false">Menu</button>
  <div class="vxc-navbar-menu" data-vx-menu id="showcase-nav">
    <div class="vxc-navbar-links">
      <a href="#buttons">Buttons</a>
      <a href="#forms">Forms</a>
      <a href="#interactivity">Interactivity</a>
    </div>
    <div class="vxc-navbar-actions">
      <button class="vxc-button vxs-variant-solid">Create</button>
      <button class="vxc-button">Sign in</button>
    </div>
  </div>
</nav>

<section class="vxc-stat-grid">
  <article class="vxc-stat">
    <div class="vxc-stat-value">4.2k</div>
    <div class="vxc-stat-label">Daily Active</div>
  </article>
  <article class="vxc-stat">
    <div class="vxc-stat-value">99.98%</div>
    <div class="vxc-stat-label">Uptime</div>
  </article>
  <article class="vxc-stat">
    <div class="vxc-stat-value">182ms</div>
    <div class="vxc-stat-label">P95 latency</div>
  </article>
</section>

## 2. Buttons, badges, alerts

<section id="buttons" class="vxc-card vxu-flow-stack--s3">
  <div class="vxu-flow-row--s2" style="flex-wrap: wrap;">
    <button class="vxc-button">Default</button>
    <button class="vxc-button vxs-variant-solid">Solid</button>
    <button class="vxc-button vxs-variant-outline">Outline</button>
    <button class="vxc-button vxs-variant-ghost">Ghost</button>
    <button class="vxc-button vxs-variant-link">Link</button>
    <button class="vxc-button vxs-size-sm">Small</button>
    <button class="vxc-button vxs-size-lg">Large</button>
    <span class="vxc-badge">New</span>
    <span class="vxc-badge">Beta</span>
  </div>
  <div class="vxc-alert vxs-tone-info">
    <div class="vxc-alert-title">Info</div>
    <p class="vxu-tone-ink--mute">Alert components and tone variants render with accessible contrast.</p>
  </div>
</section>

## 3. Forms

<section id="forms" class="vxc-card vxu-flow-stack--s3">
  <div class="vxc-form">
    <div class="vxc-form-row">
      <label class="vxc-label" for="showcase-name">Name</label>
      <input id="showcase-name" class="vxc-input" type="text" placeholder="Operator name" />
      <div class="vxc-help">Used in notification and audit events.</div>
    </div>
    <div class="vxc-form-row">
      <label class="vxc-label" for="showcase-role">Role</label>
      <select id="showcase-role" class="vxc-select">
        <option>Admin</option>
        <option>Editor</option>
        <option>Viewer</option>
      </select>
    </div>
    <div class="vxc-form-row">
      <label class="vxc-label" for="showcase-volume">Alert volume</label>
      <input id="showcase-volume" class="vxc-range" type="range" min="0" max="100" value="60" />
    </div>
    <label class="vxc-switch">
      <input type="checkbox" checked />
      <span>Enable mission notifications</span>
    </label>
  </div>
</section>

## 4. Cards + responsive grid

<section class="vxc-feature-grid">
  <article class="vxc-feature-card">
    <div class="vxc-feature-icon">LT</div>
    <div class="vxc-feature-title">Layout tokens</div>
    <p class="vxu-tone-ink--mute">This section uses responsive grid and flow utilities.</p>
  </article>
  <article class="vxc-feature-card">
    <div class="vxc-feature-icon">UT</div>
    <div class="vxc-feature-title">Utility classes</div>
    <p class="vxu-tone-ink--mute">Spacing, typography, color, and display utilities compose all sections.</p>
  </article>
  <article class="vxc-feature-card">
    <div class="vxc-feature-icon">RS</div>
    <div class="vxc-feature-title">Responsive behavior</div>
    <p class="vxu-tone-ink--mute">Cards collapse to a single column on smaller screens and expand on wider viewports.</p>
  </article>
</section>

## 5. Tabs + accordion

<section class="vxc-card vxu-flow-stack--s3">
  <div class="vxc-tabs" data-vx="tabs">
    <div class="vxu-flow-row--s2">
      <button class="vxc-button vxs-variant-outline" data-vx-tab="overview">Overview</button>
      <button class="vxc-button vxs-variant-outline" data-vx-tab="metrics">Metrics</button>
      <button class="vxc-button vxs-variant-outline" data-vx-tab="logs">Logs</button>
    </div>
    <div data-vx-panel="overview">System healthy. Next maintenance in 3 days.</div>
    <div data-vx-panel="metrics">Average throughput: 1,240 req/min.</div>
    <div data-vx-panel="logs">No critical error in the last 24 hours.</div>
  </div>

  <div class="vxc-accordion" data-vx="accordion">
    <div class="vxc-accordion-item">
      <button class="vxc-accordion-trigger" data-vx-trigger="faq-a">How does responsive mode work?</button>
      <div class="vxc-accordion-panel" data-vx-panel="faq-a">
        Utility and component layouts are token-driven and adapt using configured breakpoints.
      </div>
    </div>
    <div class="vxc-accordion-item">
      <button class="vxc-accordion-trigger" data-vx-trigger="faq-b">Can I mix utilities with components?</button>
      <div class="vxc-accordion-panel" data-vx-panel="faq-b">
        Yes. Velynx is designed for composable utilities and components.
      </div>
    </div>
  </div>
</section>

## 6. Interactivity modules

<section id="interactivity" class="vxc-card vxu-flow-stack--s3">
  <div class="vxu-flow-row--s2" style="flex-wrap: wrap;">
    <button class="vxc-button" data-vx-tooltip="Tooltip module active">Tooltip</button>
    <button class="vxc-button" data-vx-open="showcase-modal">Open modal</button>
    <button class="vxc-button" data-vx-toast="showcase-toast" data-vx-toast-msg="Toast event from showcase page">
      Trigger toast
    </button>
  </div>

  <div class="vxc-dropdown" data-vx="dropdown">
    <button class="vxc-button vxs-variant-outline" data-vx-toggle>Dropdown menu</button>
    <div class="vxc-dropdown-menu" data-vx-menu>
      <div class="vxc-list-item">Route traffic</div>
      <div class="vxc-list-item">Inspect logs</div>
      <div class="vxc-list-item">Archive report</div>
    </div>
  </div>

  <div class="vxu-flow-row--s2">
    <button class="vxc-button vxs-variant-outline" data-vx-popover="showcase-popover">Popover</button>
    <div id="showcase-popover" class="vxc-popover vxs-hidden">
      Popover panel content loaded through Velynx popover module.
    </div>
  </div>

  <div class="vxc-progress vxc-progress-particles" data-vx="particle-progress" data-vx-progress="70"></div>
</section>

<div id="showcase-toast" data-vx="toast-stack" class="vxu-flow-stack--s2" style="position: fixed; top: 1rem; right: 1rem;"></div>

<div class="vxc-modal" id="showcase-modal" data-vx="modal" data-vx-angle="top-right">
  <div class="vxc-modal-panel vxu-flow-stack--s3">
    <h3 class="vxu-type-scale--t4">Modal module</h3>
    <p class="vxu-tone-ink--mute">
      Modal open/close behavior, aria state updates, and directional animation are active.
    </p>
    <button class="vxc-button" data-vx-close="showcase-modal">Close</button>
  </div>
</div>

## 7. Theming

<section class="vxc-card vxu-flow-stack--s3">
  <p class="vxu-tone-ink--mute">
    Toggle below to switch between light and dark Velynx classes on the documentation root.
  </p>
  <ThemeSwitcherDemo />
</section>
