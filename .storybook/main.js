module.exports = {
  "stories": [
    "../stories/**/*.story.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: { builder: "storybook-builder-vite" }
}