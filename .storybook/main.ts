import { fileURLToPath } from 'node:url';
import { defineMain } from '@storybook/web-components-vite/node';
import remarkGfm from 'remark-gfm';

export default defineMain({
  framework: '@storybook/web-components-vite',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.story.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.story.@(js|jsx|mjs|ts|tsx)',
  ],

  staticDirs: ['./images', { from: '../images', to: '/images' }],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    fileURLToPath(
      import.meta.resolve('../storyhelpers/storybook-readme/index.ts'),
    ),
  ],

  docs: {},

  viteFinal(config) {
    // Storybook's builder-vite hardcodes base: './' and also loads our
    // vite.config.ts which has experimental.renderBuiltUrl. Both cause
    // Vite's modulepreload helper to resolve dep URLs relative to the
    // importing module (new URL("assets/x", import.meta.url)), producing
    // /assets/assets/x.js (404) when deployed at a root path.
    // Fix: use absolute base and remove renderBuiltUrl (only needed for
    // the library build's CSS font paths, not Storybook).
    config.base = '/';
    if (config.experimental) {
      delete config.experimental.renderBuiltUrl;
    }
    return config;
  },
});
