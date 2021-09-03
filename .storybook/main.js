module.exports = {
  "stories": [
    "../src/**/*.story.mdx",
    "../src/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: { builder: "storybook-builder-vite" }
}