import {
  setCustomElementsManifest,
  type Preview,
} from '@storybook/web-components';
import '../packages/uui-css/lib/uui-css.css';
import customElements from '../custom-elements.json';
import { html } from 'lit';

import '@umbraco-ui/uui-icon-registry-essential/lib';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  tags: ['autodocs'],

  decorators: [
    story => {
      return html`<uui-icon-registry-essential class="uui-font uui-text"
        >${story()}</uui-icon-registry-essential
      >`;
    },
  ],
};

WebComponentFormatter(customElements);
setCustomElementsManifest(customElements);

function WebComponentFormatter(customElements) {
  (customElements.modules ?? [])
    .flatMap(module => module.declarations ?? [])
    .forEach(declaration => {
      declaration.attributes = [];

      for (let cssProp of declaration.cssProperties || []) {
        // If the property does not have a type, set it to string
        if (!cssProp.type) {
          cssProp.type = 'string';
        }
      }

      declaration.members = declaration.members?.filter(
        member => member.privacy !== 'private' && !member.name.startsWith('_'),
      );

      const propertyNames = (declaration.members || []).map(p => p.name);

      for (let slot of declaration.slots || []) {
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
    });
}

export default preview;
