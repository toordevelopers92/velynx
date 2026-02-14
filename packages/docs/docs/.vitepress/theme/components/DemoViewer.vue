<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';

type SourcePayload = {
  title: string;
  slug: string;
  html: string;
  css: string;
  js: string;
  sourcePath: string;
};

const props = defineProps<{
  slug: string;
  title?: string;
}>();

const loading = ref(true);
const error = ref('');
const copied = ref('');
const source = ref<SourcePayload | null>(null);

const frameSrc = computed(() => withBase(`/demos/${props.slug}/index.html`));
const sourceJson = computed(() => withBase(`/demos/${props.slug}/source.json`));

const copyCode = async (key: 'html' | 'css' | 'js') => {
  if (!source.value) {
    return;
  }
  const value = source.value[key];
  if (!value) {
    return;
  }
  await navigator.clipboard.writeText(value);
  copied.value = key;
  window.setTimeout(() => {
    if (copied.value === key) {
      copied.value = '';
    }
  }, 1200);
};

const loadSource = async () => {
  try {
    const response = await fetch(sourceJson.value);
    if (!response.ok) {
      throw new Error(`Unable to load source for ${props.slug}`);
    }
    source.value = await response.json();
    await nextTick();
    window.__vxAutoInit?.();
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Failed to load demo source.';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadSource();
});
</script>

<template>
  <section class="vx-demo-viewer vxu-flow-stack--s3" :aria-busy="loading ? 'true' : 'false'">
    <div v-if="error" class="vxc-alert vxs-tone-danger">
      <div class="vxc-alert-title">Demo load failed</div>
      <p class="vxu-tone-ink--mute">{{ error }}</p>
    </div>

    <article v-else class="vxc-card vxu-flow-stack--s3">
      <h3 class="vxu-type-scale--t4">{{ title || source?.title || slug }}</h3>
      <p class="vxu-tone-ink--mute">
        Live preview is rendered in an isolated iframe using the imported example.
      </p>
      <iframe
        class="vx-demo-frame"
        :src="frameSrc"
        :title="`Live preview for ${title || slug}`"
        loading="lazy"
      ></iframe>
    </article>

    <article v-if="source" class="vxc-card vxu-flow-stack--s3">
      <div class="vxu-flow-row--s2" style="justify-content: space-between; align-items: center;">
        <h3 class="vxu-type-scale--t4">Source code</h3>
        <span class="vxc-badge">{{ source.sourcePath }}</span>
      </div>

      <div class="vxc-tabs" data-vx="tabs">
        <div class="vxu-flow-row--s2">
          <button class="vxc-button vxs-variant-outline" data-vx-tab="html">HTML</button>
          <button class="vxc-button vxs-variant-outline" data-vx-tab="css">CSS</button>
          <button class="vxc-button vxs-variant-outline" data-vx-tab="js">JS</button>
        </div>

        <div data-vx-panel="html" class="vxu-flow-stack--s2">
          <button class="vxc-button vxs-size-sm" @click="copyCode('html')">
            {{ copied === 'html' ? 'Copied' : 'Copy HTML' }}
          </button>
          <pre class="vxc-code-block"><code>{{ source.html }}</code></pre>
        </div>

        <div data-vx-panel="css" class="vxu-flow-stack--s2">
          <button class="vxc-button vxs-size-sm" @click="copyCode('css')">
            {{ copied === 'css' ? 'Copied' : 'Copy CSS' }}
          </button>
          <pre class="vxc-code-block"><code>{{ source.css || '/* No CSS block in this demo */' }}</code></pre>
        </div>

        <div data-vx-panel="js" class="vxu-flow-stack--s2">
          <button class="vxc-button vxs-size-sm" @click="copyCode('js')">
            {{ copied === 'js' ? 'Copied' : 'Copy JS' }}
          </button>
          <pre class="vxc-code-block"><code>{{ source.js || '// No JS block in this demo' }}</code></pre>
        </div>
      </div>
    </article>
  </section>
</template>
