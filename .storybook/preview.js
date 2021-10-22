import { setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import '../src/styles/index.css';
import 'https://cdn.skypack.dev/element-internals-polyfill';

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
    '': {
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
