import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/],
    },
    // Emit individual module files for sub-path exports
    // For the spike, a single bundle is fine
    minify: false,
    sourcemap: true,
  },
});
