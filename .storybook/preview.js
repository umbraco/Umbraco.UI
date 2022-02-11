import { setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import '../packages/uui-css/lib/custom-properties.css';
import '../packages/uui-css/lib/uui-font.css';
import '../packages/uui-css/lib/uui-text.css';
import 'element-internals-polyfill';

const sort = (a, b) => {
  if (a[1].name === 'Overview') {
    return 0;
  }
  if (b[1].name === 'Overview') {
    return 1;
  }
  return a[0] > b[0];
};

export const parameters = {
  layout: 'padded',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: { state: 'open' },
  },
  options: {
    method: 'alphabetical',
    storySort: sort,
  },
  // Hides the CSS: [] property on the docs page.
  argTypes: {
    styles: {
      table: {
        disable: true,
      },
    },
    formAssociated: {
      table: {
        disable: true,
      },
    },
  },
};

setCustomElements(customElements);
