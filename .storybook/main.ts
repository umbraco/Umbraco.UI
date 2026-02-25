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
    // Storybook's builder-vite hardcodes base: './' which causes the
    // modulepreload polyfill to resolve "assets/foo.js" relative to the JS
    // module URL (/assets/), producing /assets/assets/foo.js (404).
    // Disable the polyfill — native <link rel="modulepreload"> still works.
    config.build = {
      ...config.build,
      modulePreload: false,
    };
    return config;
  },
});
