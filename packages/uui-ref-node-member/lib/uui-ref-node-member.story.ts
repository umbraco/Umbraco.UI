import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-member',
  title: 'Displays/References/Member',
  component: 'uui-ref-node-member',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-member></uui-ref-node-member>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-member>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      selectable
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-member>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      disabled
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-member>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-member
        name=${name}
        group-name="Visitor, Registered-Member">
        <uui-action-bar slot="actions"
          ><uui-button>Remove</uui-button></uui-action-bar
        >
      </uui-ref-node-member>`
    )}
  </uui-ref-list>
`;
