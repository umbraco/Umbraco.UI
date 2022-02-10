module.exports = () => {
  return {
    plugins: {
      'postcss-advanced-variables': {},
      'postcss-color-function': {},
      'postcss-url': { url: 'inline', filter: '**/*.woff2' },
      autoprefixer: {},
    },
  };
};
