import '../packages/uui-css/lib/uui-css.css';
import 'element-internals-polyfill';

import { setCustomElements } from '@storybook/web-components';

import customElements from '../custom-elements.json';

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

WebComponentFormatter(customElements);

setCustomElements(customElements);

function WebComponentFormatter(customElements) {
  for (let tag of customElements.tags || []) {
    for (let slot of tag.slots || []) {
      // Replace the name of the default slot so Storybook will show it
      if (typeof slot.name === 'string' && slot.name.length === 0) {
        slot.name = 'slot';
      }

      // Set type of slots
      if (typeof slot.type === 'undefined' || slot.type.length === 0) {
        slot.type = 'HTMLElement';
      }
    }
  }

  return customElements;
}
