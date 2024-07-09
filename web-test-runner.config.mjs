import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

const silencedLogs = [
  'Lit is in dev mode.',
  'Multiple versions of Lit loaded.',
];

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  nodeResolve: true,
  files: 'packages/**/*.test.ts',
  plugins: [esbuildPlugin({ ts: true, target: 'auto-always' })],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
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
        <link rel="stylesheet" href="/packages/uui-css/dist/uui-css.css">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
        <script type="module">
          import 'element-internals-polyfill';
        </script>
      </body>
    </html>`,
};
