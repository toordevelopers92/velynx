# Framework audit and blueprint

## Framework Audit Summary

Strengths:
- Token-driven glass surfaces, consistent spacing, and a strong neon palette foundation.
- Layered CSS output (Primer/Spectrum/Lattice/Modules) supports low-specificity overrides.
- Modular JS behaviors cover essential overlays and navigation patterns.

Risks:
- Utilities and components still overlap in a few surface areas (layout and spacing).
- Some advanced data and input components need both design and behavior upgrades.
- State/variant coverage is uneven in docs versus code (needs a unified spec).

Missing or partial:
- Advanced data interaction (virtualized tables, tree views, command surface).
- Forced-colors and print-ready component pass.
- Interaction primitives (focus trap, roving tabindex, inert/scroll lock).

## Gold Standard Inventory

### A. Foundations (Tokens and primitives)
- Spectrum color system: core palette, semantic roles, state ramps, overlays, elevation tints.
- Type system: families, scale, weights, leading, tracking, truncation rules, multilingual fallbacks.
- Spatial system: space, size, rhythm, container and icon sizes, safe-area insets.
- Shape system: radii, border widths, outline/ring sizes.
- Depth system: shadows, glow ramps, glass layers, opacity ramps.
- Motion system: durations, easing, reduced-motion policy, motion-safe defaults.
- Accessibility primitives: focus ring policy, contrast targets, touch target sizes.
- Theming model: theme classes, brand packs, high-contrast overrides, system sync.

### B. Utilities (Complete surface area)
- Layout/display/position/overflow/visibility/z-index/isolation.
- Flex and grid (tracks, spans, alignment, flow, order, basis).
- Spacing and gap (all axes, logical properties, safe-area).
- Sizing, aspect ratio, container and container query helpers.
- Typography and text behavior (scale, weight, align, wrap, clamp).
- Color, backgrounds, gradients, borders, outlines, rings.
- Effects: shadows, glow, filters, backdrop, mix-blend.
- Interaction: cursor, pointer-events, user-select, touch-action, scroll-snap.
- Accessibility helpers (sr-only, focus utilities, aria/data-state variants).
- Print, reduced-motion, forced-colors, RTL utilities.

### C. Layout Constructs
- Container primitives and gutters.
- Stack/cluster/rail/sidebar templates.
- App shell patterns (topbar, sidebar, content grids).
- Page rhythm helpers and section spacing.

### D. Components (Core + Advanced)
- Actions: buttons, icon actions, segmented controls, action groups, loading states.
- Forms: all input types, input groups, validation, file and range, tags, ratings.
- Navigation: navbars, tabs, breadcrumbs, pagination, steppers, side nav.
- Overlays: modal, drawer, dropdown/menu, popover, tooltip.
- Feedback: alerts, banners, toasts, progress, spinners, skeletons, empty states.
- Data display: cards, badges, avatars, chips/tags, lists, tables, key/value, dividers.
- Disclosure/content: accordion, prose, code styling.
- Advanced: combobox, multiselect, date/time picker, data table enhancements, tree view, command surface, carousel, drag-and-drop primitives.

### E. Behavioral Primitives (JS Layer)
- Focus management, focus trap, roving tabindex.
- Portal/teleport layer.
- Positioning engine with collision handling.
- Dismissal rules (escape/click-outside).
- Scroll lock and inert background.
- Animation orchestration (enter/exit hooks).
- ARIA relationship helpers and ID management.
- Keyboard navigation standards per component type.

### F. Developer Experience and Tooling
- Minified/unminified builds, modular bundles.
- Token export formats (CSS, JSON, design tools).
- Documentation + examples and recipes.
- Testing strategy (a11y, visual regression hooks).
- Versioning and migration policy.
- Lint rules and usage guidelines.

## Coverage Matrix

- Foundations: Present (tokens), Partial (accessibility tokens, icon sizing, motion spec)
- Utilities: Present (broad), Partial (print/forced-colors docs), Needs audit for redundancy
- Layout constructs: Present (stack/grid/app shell), Partial (sidebar/cluster variants)
- Components: Present (core), Partial (advanced data and input components)
- Behavioral primitives: Partial (basic overlays), Missing (focus trap, roving tabindex, positioning engine)
- Tooling: Present (build/test), Partial (token export formats, migration guidance)

## Missing Items to Add (prioritized)

1) Behavioral primitives: focus trap, roving tabindex, inert/scroll lock, collision positioning.
2) Advanced data: data grid enhancements, tree view, command surface, drag-and-drop.
3) Form power-ups: combobox, multiselect, date/time pickers, rich validation patterns.
4) Theming pipeline: export tokens to JSON + design tools, brand packs.
5) Accessibility hardening: forced-colors and print variants for every component.

## Upgrade Recommendations (prioritized)

1) Unify variants across utilities and components with suffix-based variants (`__hover`, `__at-*`).
2) Add a11y-first interaction primitives (focus trap, roving tabindex, inert/lock).
3) Expand container query usage and define container size tokens.
4) Reduce utility overlap by documenting macro vs micro utility intent.
5) Add structured migration notes and lint guidance for correct class usage.

## Architecture Blueprint

- Tokens: `--vx-*` Spectrum tokens, semantic aliases for surfaces, ink, states.
- Variants: suffix-based (`__hover`, `__at-m`, `__theme-contrast`, `__motion-reduce`).
- Layers: `primer` (reset), `spectrum` (tokens), `lattice` (utilities), `modules` (components), `overrides`.
- Component composition: base class (`vxc-*`) + state/variant class (`vxs-*`) + utilities (`vxu-*`).

## Implementation Roadmap

Phase 1 (must-have)
- Ship unified utility variant system and update docs/examples.
- Add focus trap, scroll lock, and inert helpers to JS.
- Add forced-colors and print variants in utilities.

Phase 2 (full)
- Build advanced input modules (combobox, date/time, multiselect).
- Add command surface, tree view, data grid enhancements.
- Export tokens to JSON and add theme pack support.

Phase 3 (polish/enterprise)
- Visual regression and a11y test harnesses.
- Migration guides, lint rules, and deprecation map.
- Performance audits and bundle profiling.

## Definition of Done

- All A-F inventory items documented with variants, dependencies, and examples.
- Every component has keyboard support and reduced-motion/forced-colors behavior.
- Utilities cover all listed categories with responsive and state variants.
- Tokens export to CSS + JSON and can drive multi-theme builds.
- Tests cover a11y, regression, and build outputs.
