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

  staticDirs: ['./images'],

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
});
