<script setup lang="ts">
import { ref } from 'vue';

const lightMode = ref(false);

const syncTheme = () => {
  document.documentElement.classList.toggle('vxt-light', lightMode.value);
  document.documentElement.classList.toggle('vxt-dark', !lightMode.value);
};
</script>

<template>
  <label class="vxc-switch">
    <input v-model="lightMode" type="checkbox" @change="syncTheme" />
    <span>{{ lightMode ? 'Light mode' : 'Dark mode' }}</span>
  </label>
</template>
