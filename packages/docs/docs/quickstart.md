# Quickstart

## Copy-paste starter (real layout + interactivity)

```html
<!doctype html>
<html lang="en" class="vxt-dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Velynx Starter</title>
    <link rel="stylesheet" href="./dist/velynx.extended.css" />
  </head>
  <body>
    <main class="vxu-container vxu-space-in--s6 vxu-flow-stack--s4">
      <header class="vxc-card">
        <div class="vxc-badge">Starter</div>
        <h1 class="vxu-type-scale--t6">Velynx launch panel</h1>
        <p class="vxu-tone-ink--mute">Glass surfaces, glow, and motion by default.</p>
        <div class="vxu-flow-row--s2">
          <button class="vxc-button vxs-variant-solid" data-vx-toast="main" data-vx-toast-msg="Launch confirmed">Launch</button>
          <button class="vxc-button" data-vx-open="demo-modal">Details</button>
        </div>
      </header>

      <section class="vxc-card">
        <h2 class="vxu-type-scale--t4">Telemetry</h2>
        <div class="vxc-progress"><div class="vxc-progress-bar" style="width: 78%"></div></div>
      </section>
    </main>

    <div class="vxc-modal" id="demo-modal" data-vx="modal">
      <div class="vxc-modal-panel vxu-flow-stack--s3">
        <h3 class="vxu-type-scale--t4">Modal capsule</h3>
        <p class="vxu-tone-ink--mute">The modal uses Velynx data attributes.</p>
        <button class="vxc-button" data-vx-close="demo-modal">Close</button>
      </div>
    </div>

    <div id="main" data-vx="toast-stack" class="vxu-flow-stack--s2" style="position: fixed; top: 1rem; right: 1rem;"></div>

    <script type="module">
      import { autoInit } from './packages/js/dist/velynx.esm.js';
      autoInit();
    </script>
  </body>
</html>
```

## Next steps

- Use `showcase` to see all major framework capabilities in one page.
- Open `demos/` to run imported examples with live code tabs.
- Read `tokens` for full theming strategy.



