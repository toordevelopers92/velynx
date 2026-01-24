import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Velynx',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'velynx.esm.js' : 'velynx.umd.js')
    },
    sourcemap: true
  }
});
