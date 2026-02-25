import { globSync } from 'node:fs';
import { defineConfig } from 'vite';

// Rollup's preserveModules drops pure re-export facades, so we add all
// barrel files as explicit entry points to guarantee they appear in dist/.
const barrelEntries = Object.fromEntries(
  globSync('src/**/index.ts')
    .filter(f => !f.includes('internal/test'))
    .map(f => [f.replace(/^src\//, '').replace(/\.ts$/, ''), f]),
);

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        ...barrelEntries,
        'themes/light': 'src/themes/light.css',
        'themes/dark': 'src/themes/dark.css',
        'styles/uui-font': 'src/styles/uui-font.css',
        'styles/uui-text': 'src/styles/uui-text.css',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: assetInfo => {
          if (assetInfo.names?.[0]?.endsWith('.css')) return '[name].[ext]';
          return 'assets/fonts/[name].[ext]';
        },
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    minify: false,
    sourcemap: true,
  },
  experimental: {
    // CSS files in subdirectories (e.g. themes/light.css) reference fonts
    // via url(). Vite resolves these relative to the output root, but the
    // CSS files are nested one level deep. This rewrites CSS asset URLs to
    // use ../ so font paths resolve correctly from their actual location.
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'css') {
        return '../' + filename;
      }
      return filename;
    },
  },
});
