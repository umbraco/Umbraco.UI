import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Data Type List Item',
  component: 'uui-data-type-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-data-type-list-item
      border
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-data-type-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-data-type-list-item
      selectable
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-data-type-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-data-type-list-item
      disabled
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-data-type-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-data-type-list-item
        name=${name}
        icon="bug"
        alias="Umbraco.TextField">
        <uui-action-bar slot="actions">
          <uui-button>Remove</uui-button>
        </uui-action-bar>
      </uui-data-type-list-item>`
    )}
  </uui-list>
`;
