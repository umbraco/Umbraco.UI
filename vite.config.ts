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
        'themes/high-contrast': 'src/themes/high-contrast.css',
        'styles/uui-font': 'src/styles/uui-font.css',
        'styles/uui-text': 'src/styles/uui-text.css',
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external: [/^lit/, /^culori/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        // Vite 8 (Rolldown) keeps import queries (e.g. uui-text.css?inline) in
        // preserved module file names, either raw ('?inline', invalid on Windows
        // and resolved as a query string over HTTP) or sanitized ('_inline' since
        // Rolldown 1.2.14). Strip the query like Rollup did, using the facade
        // module id to know its length, and the \0 prefix of virtual module ids
        // (not allowed on disk).
        entryFileNames: (chunk: {
          name: string;
          facadeModuleId: string | null;
        }) => {
          const query = chunk.facadeModuleId?.split('?')[1];
          const name = query
            ? chunk.name.slice(0, -(query.length + 1))
            : chunk.name;
          return `${name.replace(/\0/g, '_')}.js`;
        },
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
        client: {
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
