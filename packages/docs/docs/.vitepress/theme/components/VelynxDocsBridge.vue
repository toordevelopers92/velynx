<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, withBase } from 'vitepress';

declare global {
  interface Window {
    __vxAutoInit?: () => void;
    __vxAutoInitPromise?: Promise<void>;
  }
}

const route = useRoute();
const versionText = ref('Loading latest framework build...');

const ensureCss = () => {
  const existing = document.getElementById('vx-docs-css');
  if (existing) {
    return;
  }
  const link = document.createElement('link');
  link.id = 'vx-docs-css';
  link.rel = 'stylesheet';
  link.href = withBase('/velynx/velynx.extended.css');
  document.head.appendChild(link);
};

const ensureJs = async () => {
  if (!window.__vxAutoInitPromise) {
    window.__vxAutoInitPromise = import(/* @vite-ignore */ withBase('/velynx/velynx.esm.js')).then(
      (mod) => {
        if (typeof mod.autoInit === 'function') {
          window.__vxAutoInit = mod.autoInit;
        }
      }
    );
  }
  await window.__vxAutoInitPromise;
};

const hydrateVersion = async () => {
  try {
    const response = await fetch(withBase('/velynx/version.json'));
    if (!response.ok) {
      versionText.value = 'Framework metadata unavailable';
      return;
    }
    const payload = await response.json();
    versionText.value = `Core v${payload.coreVersion}, JS v${payload.jsVersion}`;
  } catch {
    versionText.value = 'Framework metadata unavailable';
  }
};

const hydrate = async () => {
  ensureCss();
  await ensureJs();
  window.__vxAutoInit?.();
};

onMounted(async () => {
  await hydrate();
  await hydrateVersion();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    await hydrate();
  }
);
</script>

<template>
  <div class="vx-docs-runtime vxc-banner">
    <div class="vxu-flow-row--s2">
      <span class="vxc-badge">Velynx Docs Runtime</span>
      <span class="vxu-tone-ink--mute">{{ versionText }}</span>
    </div>
  </div>
</template>
