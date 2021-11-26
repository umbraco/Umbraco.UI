import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-form',
  title: 'Displays/References/Form',
  component: 'uui-ref-node-form',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-form></uui-ref-node-form>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      selectable
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions"
        ><uui-button label="Remove">Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-form>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      disabled
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions"
        ><uui-button label="Remove">Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-form>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-form name=${name} detail="Form description">
        <uui-action-bar slot="actions"
          ><uui-button label="Remove">Remove</uui-button></uui-action-bar
        >
      </uui-ref-node-form>`
    )}
  </uui-ref-list>
`;
