import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import DemoViewer from './components/DemoViewer.vue';
import VelynxDocsBridge from './components/VelynxDocsBridge.vue';
import ThemeSwitcherDemo from './components/ThemeSwitcherDemo.vue';
import './velynx-docs.css';

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(VelynxDocsBridge)
    }),
  enhanceApp({ app }) {
    app.component('DemoViewer', DemoViewer);
    app.component('ThemeSwitcherDemo', ThemeSwitcherDemo);
  }
};
