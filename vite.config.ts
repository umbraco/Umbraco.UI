import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

const isCI = process.env.CI === 'true';
const browserInstances = isCI
  ? [
      { browser: 'chromium' as const },
      { browser: 'firefox' as const },
      { browser: 'webkit' as const },
    ]
  : [{ browser: 'chromium' as const }];

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
    include: ['src/**/*.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: browserInstances,
      headless: true,
    },
    setupFiles: ['./vitest.setup.ts'],
    onConsoleLog: (log: string) => {
      if (log.includes('Lit is in dev mode')) return false;
      if (log.includes('Multiple versions of Umbraco UI')) return false;
      if (log.includes('Multiple instances of Umbraco UI')) return false;
      return undefined;
    },
    deps: {
      optimizer: {
        web: {
          include: [
            'vitest-browser-lit',
            'axe-core',
            'lit',
            'lit/decorators.js',
            'lit/directives/if-defined.js',
            'lit/directives/ref.js',
            'lit/directives/repeat.js',
            'lit/directives/style-map.js',
            'lit/directives/unsafe-html.js',
            'lit/directives/when.js',
            'lit/static-html.js',
          ],
        },
      },
    },
  },
});
