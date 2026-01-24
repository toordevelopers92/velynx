# Quickstart

## Copy-paste starter

```html
<!doctype html>
<html lang="en" class="t-dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Velynx Starter</title>
    <link rel="stylesheet" href="./dist/velynx.extended.css" />
  </head>
  <body>
    <main class="u-container u-space-in--s6 u-flow-stack--s4">
      <header class="c-card">
        <div class="c-badge">Starter</div>
        <h1 class="u-type-scale--t6">Velynx launch panel</h1>
        <p class="u-tone-ink--mute">Glass surfaces, glow, and motion by default.</p>
        <div class="u-flow-row--s2">
          <button class="c-button c-button--solid" data-vx-toast="main" data-vx-toast-msg="Launch confirmed">Launch</button>
          <button class="c-button" data-vx-open="demo-modal">Details</button>
        </div>
      </header>

      <section class="c-card">
        <h2 class="u-type-scale--t4">Telemetry</h2>
        <div class="c-progress"><div class="c-progress-bar" style="width: 78%"></div></div>
      </section>
    </main>

    <div class="c-modal" id="demo-modal" data-vx="modal">
      <div class="c-modal-panel u-flow-stack--s3">
        <h3 class="u-type-scale--t4">Modal capsule</h3>
        <p class="u-tone-ink--mute">The modal uses Velynx data attributes.</p>
        <button class="c-button" data-vx-close="demo-modal">Close</button>
      </div>
    </div>

    <div id="main" data-vx="toast-stack" class="u-flow-stack--s2" style="position: fixed; top: 1rem; right: 1rem;"></div>

    <script type="module">
      import { autoInit } from './packages/js/dist/velynx.esm.js';
      autoInit();
    </script>
  </body>
</html>
```

## Next steps

- Read the utility catalog to learn the grammar.
- Browse components and their data attributes.
- Decide whether you want the core or extended build.
