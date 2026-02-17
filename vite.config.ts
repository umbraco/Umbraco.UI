import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        'themes/light': resolve(__dirname, 'src/themes/light.css'),
        'themes/dark': resolve(__dirname, 'src/themes/dark.css'),
        'styles/uui-font': resolve(__dirname, 'src/styles/uui-font.css'),
        'styles/uui-text': resolve(__dirname, 'src/styles/uui-text.css'),
      },
      external: [/^lit/],
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: assetInfo => {
          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return '[name].[ext]';
          }
          return 'assets/fonts/[name].[ext]';
        },
      },
    },
    cssCodeSplit: true,
    minify: false,
    sourcemap: true,
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      // Fix relative URLs in CSS to be correct from their output location
      if (hostType === 'css') {
        // CSS files in themes/ and styles/ subdirs need to go up one level
        return '../' + filename;
      }
      return filename;
    },
  },
});
