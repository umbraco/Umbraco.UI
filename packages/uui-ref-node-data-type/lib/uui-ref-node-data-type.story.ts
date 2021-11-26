import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-data-type',
  title: 'Displays/References/Data Type',
  component: 'uui-ref-node-data-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-data-type></uui-ref-node-data-type>`,
      },
    },
  },
};

export const Overview: Story = () => html` <div style="max-width: 420px;">
  <uui-ref-node-data-type
    border
    name="TextField"
    icon="bug"
    alias="Umbraco.TextField">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-data-type>
</div>`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-data-type
      selectable
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-data-type>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-data-type
      disabled
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-data-type>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-data-type
        name=${name}
        icon="bug"
        alias="Umbraco.TextField">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node-data-type>`
    )}
  </uui-ref-list>
`;
