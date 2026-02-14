# Changelog

## 0.3.0

- Added calendar single, multi, and range selection modes with optimized rendering.
- Added particle progress and image reveal modules plus corresponding component styles.
- Added directional modal animation support and cookie banner component styles.
- Added docs automation pipeline that imports all `/examples` pages into live demo docs.
- Added showcase page and live demo viewer with iframe preview plus code tabs.
- Updated GitHub Pages deployment to support custom-domain root base path.
- Hardened npm publish workflow with token validation and provenance publish.

## 0.2.7

- Fix publish workflow pnpm setup mismatch.
- Bump version to avoid npm republish errors.

## 0.2.6

- Added minified CSS outputs and CDN-friendly defaults.
- Committed package dist assets for GitHub CDN delivery.
- Expanded README with CDN and install instructions.
- Speeded up publish workflow with pnpm caching.

## 0.2.5

- Triggered publish workflow on main push and manual dispatch for trusted publishing.

## 0.2.4

- Switched CI publish to npm trusted publishing (OIDC) without tokens.

## 0.2.3

- Added explicit npm auth configuration for CI publish.

## 0.2.2

- Added npm auth token to publish workflow for CI releases.

## 0.2.1

- Fixed release workflow to publish only the public packages.

## 0.2.0

- Introduced new prefix and suffix-based variant system across utilities and components.
- Expanded token model with typography scale, weights, tracking, and container sizing.
- Modernized docs, examples, and added the full framework audit blueprint.

## 0.1.1

- Added atomic utility system with variants, plus new tokens (fonts, shadows, ring).
- Expanded component catalog and docs for launch-ready UI patterns.
- Added calendar and navbar interactivity modules.

## 0.1.0

- Initial release with core utilities, components, and interaction modules.
- VitePress documentation and example pages.
