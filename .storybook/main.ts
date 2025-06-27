import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../packages/**/*.mdx',
    '../packages/**/*.story.@(js|jsx|mjs|ts|tsx)',
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
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '../storyhelpers/storybook-readme',
    // TODO: Remove this when Chromatic supports this version of Storybook
    // '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  docs: {},
};
export default config;
