import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/DocumentType List Item',
  component: 'uui-document-type-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-document-type-list-item
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-document-type-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-document-type-list-item
      selectable
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-document-type-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-document-type-list-item
      disabled
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-document-type-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-document-type-list-item
        name=${name}
        icon="bug"
        alias="productPageAlias">
        <uui-action-bar slot="actions">
          <uui-button>Remove</uui-button>
        </uui-action-bar>
      </uui-document-type-list-item>`
    )}
  </uui-list>
`;
