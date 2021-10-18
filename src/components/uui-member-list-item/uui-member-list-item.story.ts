import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Member List Item',
  component: 'uui-member-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-member-list-item
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-member-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-member-list-item
      selectable
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-member-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-member-list-item
      disabled
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-member-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-member-list-item
        name=${name}
        group-name="Visitor, Registered-Member">
        <uui-action-bar slot="actions"
          ><uui-button>Remove</uui-button></uui-action-bar
        >
      </uui-member-list-item>`
    )}
  </uui-list>
`;
