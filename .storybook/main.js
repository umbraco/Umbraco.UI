module.exports = {
  stories: ['../**/out-tsc/src/**/*.stories.js'],
  addons: [
    'storybook-prebuilt/addon-knobs/register.js',
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-viewport/register.js',
    'storybook-prebuilt/addon-a11y/register.js',
  ],
  esDevServer: {
    // custom es-dev-server options
    nodeResolve: true,
    watch: true,
    open: true,
  },
};
