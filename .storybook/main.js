const tsconfigPaths = require('vite-tsconfig-paths').default;
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
    '../storyhelpers/storybook-readme/preset.js',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
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
