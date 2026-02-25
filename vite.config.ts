import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        index: 'src/index.ts',
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
