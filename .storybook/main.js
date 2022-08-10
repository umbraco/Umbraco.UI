const tsconfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  stories: ['../packages/**/*.story.ts', '../stories/**/*.story.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '../storyhelpers/storybook-readme/preset.js',
  ],
  framework: '@storybook/web-components',
  features: { storyStoreV7: false },
  core: { builder: '@storybook/builder-vite' },
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
};
