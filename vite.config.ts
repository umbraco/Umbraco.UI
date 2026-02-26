import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
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
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'css') {
        return '../' + filename;
      }
      return filename;
    },
  },
  test: {
    globals: true,
    include: [
      'src/components/button/button.test.ts',
      'src/components/input/input.test.ts',
    ],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      optimizer: {
        web: {
          include: [
            'vitest-browser-lit',
            'axe-core',
            'lit',
            'lit/decorators.js',
            'lit/directives/if-defined.js',
          ],
        },
      },
    },
  },
});
