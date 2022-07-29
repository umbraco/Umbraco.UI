module.exports = {
  stories: [
    '../packages/**/*.story.mdx',
    '../packages/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
  },
};
