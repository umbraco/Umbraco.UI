import {
  setCustomElementsManifest,
  type Preview,
} from '@storybook/web-components';
import '../packages/uui-css/dist/uui-css.css';
import customElements from '../custom-elements.json';
import { html } from 'lit';

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
        format: 'html', // see storybook docs for more info on this format https://storybook.js.org/docs/api/doc-blocks/doc-block-source#format
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

    // add 'Event' to the name of all events
    for (let event of tag.events || []) {
      event.name = `${event.name} event`;
    }

    // Run through all slots to clean them up a bit
    for (let slot of tag.slots || []) {
      // Replace the name of the default slot so Storybook will show it
      if (typeof slot.name === 'string' && slot.name.length === 0) {
        slot.name = 'slot';
      } else {
        // Add slot to the name. This will allow us to filter out slots in various situations. Example the spread directive.
        // Bug reported to Storybook here: https://github.com/storybookjs/storybook/issues/17733
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

export default preview;
