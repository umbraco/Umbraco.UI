const tsconfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  stories: ['../packages/**/*.story.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  core: { builder: 'storybook-builder-vite' },
  async viteFinal(config, { configType }) {
    // customize the Vite config here

    if (configType === 'DEVELOPMENT') {
      // add plugins
      config.plugins.push(tsconfigPaths());

      // pre bundle dependencies for faster startup time
      config.optimizeDeps.include.push('@storybook/web-components');
      config.optimizeDeps.include.push('lit-html');
      config.optimizeDeps.include.push('lit');
      config.optimizeDeps.include.push('lit/decorators.js');
      config.optimizeDeps.include.push('lit/directives/style-map.js');
    }

    return config;
  },
};
