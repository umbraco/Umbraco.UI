import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig & {
  managerEntries?: (entry?: string[]) => string[];
} = {
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
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],

  managerEntries(entry = []) {
    return [
      ...entry,
      fileURLToPath(
        import.meta.resolve('../storyhelpers/storybook-readme/manager.ts'),
      ),
    ];
  },

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  docs: {},
};
export default config;
