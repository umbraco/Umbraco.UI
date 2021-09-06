module.exports = {
  "stories": [
    "../packages/**/*.story.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: { builder: "storybook-builder-vite" }
}