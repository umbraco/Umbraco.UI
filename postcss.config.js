module.exports = () => {
  // eventualy load falback values here?
  return {
    plugins: {
      'postcss-nested': {},
      'postcss-advanced-variables': {},
      'postcss-color-function': {},
      autoprefixer: {},
    },
  };
};
