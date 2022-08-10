import '../packages/uui-css/lib/uui-css.css';
import 'element-internals-polyfill';

import { setCustomElements } from '@storybook/web-components';

import customElements from '../custom-elements.json';

export const parameters = {
  layout: 'padded',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)/i,
      date: /Date$/,
    },
  },
  docs: {
    source: { state: 'open' },
  },
  options: {
    method: 'alphabetical',
    storySort: (a, b) => {
      //NOTE: This has to be an inline function for some reason
      if (a.title === 'Overview') {
        return 0;
      }
      if (b.title === 'Overview') {
        return 1;
      }
      return a.title > b.title;
    },
  },
};

WebComponentFormatter(customElements);

setCustomElements(customElements);

function WebComponentFormatter(customElements) {
  for (let tag of customElements.tags || []) {
    // Hide all attributes, since we only use props for storybook
    tag.attributes = [];

    // Hide all 'styles' and 'formAssociated' entries for properties
    for (let prop in tag.properties || []) {
      if (
        tag.properties[prop].name === 'styles' ||
        tag.properties[prop].name === 'formAssociated'
      ) {
        delete tag.properties[prop];
      }
    }

    // Run through all CSS Custom Properties and clean them a bit
    for (let cssProp of tag.cssProperties || []) {
      // If the property does not have a type, set it to string
      if (!cssProp.type) {
        cssProp.type = 'string';
      }
    }

    // Find all names of properties
    const propertyNames = (tag.properties || []).map(p => p.name);

    // Run through all slots to clean them up a bit
    for (let slot of tag.slots || []) {
      // Replace the name of the default slot so Storybook will show it
      if (typeof slot.name === 'string' && slot.name.length === 0) {
        slot.name = 'slot';
      }

      // If the slot has the same name as a property, then add the word 'slot' to the name
      // Bug reported to Storybook here: https://github.com/storybookjs/storybook/issues/17733
      if (propertyNames.includes(slot.name)) {
        slot.name = `${slot.name} slot`;
      }

      // Set type of slots
      if (typeof slot.type === 'undefined' || slot.type.length === 0) {
        slot.type = 'HTMLElement';
      }
    }
  }

  return customElements;
}
