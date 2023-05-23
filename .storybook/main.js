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
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
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
    name: '@storybook/web-components-vite',
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
    config.plugins.push(processLitCSSPlugin());
    if (configType === 'DEVELOPMENT') {
      // add plugins
      config.plugins.push(tsconfigPaths());
    }
    return config;
  },
  docs: {
    autodocs: true,
  },
};
