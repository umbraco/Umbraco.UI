import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-user',
  title: 'Displays/References/User',
  component: 'uui-ref-node-user',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-user></uui-ref-node-user>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user name="Arnold Edits" group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button label="Remove">Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-user>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      selectable
      name="Arnold Edits"
      group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button label="Remove">Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-user>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      disabled
      name="Arnold Edits"
      group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button label="Remove">Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-user>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-user
        name=${name}
        group-name="Editors, Translators">
        <uui-action-bar slot="actions"
          ><uui-button label="Remove">Remove</uui-button></uui-action-bar
        >
      </uui-ref-node-user>`
    )}
  </uui-ref-list>
`;
