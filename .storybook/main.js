import { dirname, join } from 'path';
import turbosnap from 'vite-plugin-turbosnap';
import { mergeConfig } from 'vite';
const remarkGfm = require('remark-gfm').default;
const tsconfigPaths = require('vite-tsconfig-paths').default;

/**
 * @type {import('@storybook/web-components-vite').StorybookConfig}
 */
module.exports = {
  stories: [
    '../packages/**/*.story.ts',
    '../stories/**/*.story.ts',
    '../packages/**/*.story.mdx',
    '../stories/**/*.story.mdx',
    '../packages/**/*.mdx',
    '../stories/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    '../storyhelpers/storybook-readme',
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
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ['./images'],
  async viteFinal(config, { configType }) {
    // customize the Vite config here

    const processLitCSSPlugin = (
      await import('../scripts/processLitCSSPlugin.mjs')
    ).default;

    return mergeConfig(config, {
      plugins: [
        processLitCSSPlugin(),
        configType === 'PRODUCTION'
          ? [
              turbosnap({
                // This should be the base path of your storybook.  In monorepos, you may only need process.cwd().
                rootDir: process.cwd(),
              }),
            ]
          : [],
        configType === 'DEVELOPMENT' ? [tsconfigPaths()] : [],
      ],
    });
  },
  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
