import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

// TODO: Figure out why we now need to import everything that every component uses
import '../action-bar/index.js';
import '../button/index.js';
import '../ref-node/index.js';

const meta: Meta = {
  id: 'uui-ref-list',
  component: 'uui-ref-list',
  title: 'Displays/Reference List',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: args => {
    const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);

    console.log('args', listOfNodeNames);

    return html`<uui-ref-list ${spread(args)}>
      ${listOfNodeNames.map(
        name =>
          html`<uui-ref-node name=${name} detail="path/to/nowhere">
            <uui-action-bar slot="actions">
              <uui-button label="Remove">Remove</uui-button>
            </uui-action-bar>
          </uui-ref-node>`,
      )}
    </uui-ref-list>`;
  },
};
