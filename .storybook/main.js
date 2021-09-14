module.exports = {
  stories: ['../src/**/*.story.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  core: { builder: 'storybook-builder-vite' },
};
