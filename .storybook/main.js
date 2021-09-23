const tsconfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  stories: ['../stories/**/*.story.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  core: { builder: 'storybook-builder-vite' },
  async viteFinal(config, { configType }) {
    // customize the Vite config here

    config.plugins.push(tsconfigPaths());

    return config
  },
};
