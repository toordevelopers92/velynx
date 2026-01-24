# Browser support

Velynx targets the latest stable releases of Chrome, Edge, Firefox, and Safari. If a feature is not available, Velynx should degrade gracefully:

- Backdrop blur is optional. Surfaces still render without blur.
- Container queries are optional. Layouts fall back to media queries.
- Reduced motion users receive minimal animation.
