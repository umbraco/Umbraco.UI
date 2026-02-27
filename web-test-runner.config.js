import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

const silencedLogs = [
  'Lit is in dev mode.',
  'Multiple versions of Lit loaded.',
  'Multiple versions of Umbraco UI detected',
  'Multiple instances of Umbraco UI',
];

const isCI = process.env.CI === 'true';
const browsers = isCI
  ? [
      playwrightLauncher({ product: 'chromium' }),
      playwrightLauncher({ product: 'firefox' }),
      playwrightLauncher({ product: 'webkit' }),
    ]
  : [playwrightLauncher({ product: 'chromium' })];

/** Plugin to handle Vite-style ?inline CSS imports for WTR. */
function cssInlinePlugin() {
  return {
    name: 'css-inline',
    resolveImport({ source, context }) {
      // Strip ?inline from CSS imports so WTR can resolve the file
      if (source.endsWith('.css?inline')) {
        const cleanPath = source.replace('?inline', '');
        // Resolve relative to the importing file's directory
        const dir = dirname(context.path);
        return `${dir}/${cleanPath}`.replace(/\/+/g, '/');
      }
    },
    serve(context) {
      // Serve .css files as JS modules that export the CSS string
      if (context.path.endsWith('.css')) {
        const filePath = resolve('.' + context.path);
        try {
          const css = readFileSync(filePath, 'utf-8');
          return {
            body: `export default ${JSON.stringify(css)};`,
            type: 'js',
          };
        } catch {
          // File not found, let other plugins handle it
        }
      }
    },
  };
}

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  nodeResolve: true,
  files: 'src/**/*.test.ts',
  plugins: [
    cssInlinePlugin(),
    esbuildPlugin({
      ts: true,
      json: true,
      target: 'auto-always',
      tsconfig: './tsconfig.json',
    }),
  ],
  browsers,
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && silencedLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },
  testRunnerHtml: testFramework =>
    `<html>
      <head>
        <link rel="stylesheet" href="/dist/themes/light.css">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
};
