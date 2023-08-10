import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  nodeResolve: true,
  files: 'packages/**/*.test.ts',
  plugins: [esbuildPlugin({ ts: true, target: 'auto-always' })],
  concurrentBrowsers: process.env.CI ? 3 : undefined,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
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
