import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Velynx UI',
  description: 'A hybrid utility + component framework with a glass-first aesthetic.',
  themeConfig: {
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'Quickstart', link: '/quickstart' },
      { text: 'Utilities', link: '/utilities' },
      { text: 'Components', link: '/components' },
      { text: 'Interactivity', link: '/interactivity' },
      { text: 'Audit', link: '/framework-audit' }
    ],
    sidebar: [
      { text: 'Getting Started', items: [
        { text: 'Overview', link: '/' },
        { text: 'Install', link: '/install' },
        { text: 'Quickstart', link: '/quickstart' },
        { text: 'Kitchen Sink', link: '/kitchen-sink' }
      ] },
      { text: 'Design System', items: [
        { text: 'Tokens & Theming', link: '/tokens' },
        { text: 'Utilities', link: '/utilities' },
        { text: 'Components', link: '/components' },
        { text: 'Motion', link: '/motion' }
      ] },
      { text: 'Guides', items: [
        { text: 'Interactivity', link: '/interactivity' },
        { text: 'Responsive & RTL', link: '/responsive-rtl' },
        { text: 'Accessibility', link: '/accessibility' },
        { text: 'Browser Support', link: '/support' },
        { text: 'Performance', link: '/performance' },
        { text: 'Plugins', link: '/plugins' }
      ] },
      { text: 'Project', items: [
        { text: 'Contributing', link: '/contributing' },
        { text: 'Framework Audit', link: '/framework-audit' },
        { text: 'Changelog', link: '/changelog' },
        { text: 'Roadmap', link: '/roadmap' }
      ] }
    ]
  }
});
