import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
import autoprefixer from 'autoprefixer';
import properties from '../packages/uui-css/custom-properties';

export default function postCSSFallbackValuesPlugins(options = {}) {
  return [
    postcssCustomPropertiesFallback({ importFrom: properties }),
    autoprefixer({ env: options.autoprefixerEnv }),
  ];
}
