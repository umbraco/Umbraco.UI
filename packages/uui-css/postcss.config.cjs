/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('postcss-advanced-variables'),
    require('postcss-url'),
    require('autoprefixer'),
  ],
};

module.exports = config;
