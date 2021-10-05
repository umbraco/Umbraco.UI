
module.exports = (ctx) => ({
    map: ctx.options.map,
    plugins: {
      "postcss-advanced-variables": {},
      "postcss-color-function": {},
    },
  });