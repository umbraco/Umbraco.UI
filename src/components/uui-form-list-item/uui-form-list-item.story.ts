import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Form List Item',
  component: 'uui-form-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-form-list-item
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-form-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-form-list-item
      selectable
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-form-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-form-list-item
      disabled
      name="Newsletter Signup"
      detail="Accept and signup for newsletter">
      <uui-action-bar slot="actions"
        ><uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-form-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-form-list-item name=${name} detail="Form description">
        <uui-action-bar slot="actions"
          ><uui-button>Remove</uui-button></uui-action-bar
        >
      </uui-form-list-item>`
    )}
  </uui-list>
`;
