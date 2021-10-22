import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/User List Item',
  component: 'uui-user-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-user-list-item name="Arnold Edits" group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-user-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-user-list-item
      selectable
      name="Arnold Edits"
      group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-user-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-user-list-item
      disabled
      name="Arnold Edits"
      group-name="Editors, Translators">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-user-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-user-list-item
        name=${name}
        group-name="Editors, Translators">
        <uui-action-bar slot="actions"
          ><uui-button>Remove</uui-button></uui-action-bar
        >
      </uui-user-list-item>`
    )}
  </uui-list>
`;
