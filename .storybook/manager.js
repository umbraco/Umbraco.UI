import { addons } from 'storybook/manager-api';
import umbracoTheme from './umbraco-theme';

addons.setConfig({
  theme: umbracoTheme,
});
