import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/DataType List Item',
  component: 'uui-datatype-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-datatype-list-item
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-datatype-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-datatype-list-item
      selectable
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-datatype-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-datatype-list-item
      disabled
      name="TextField"
      icon="bug"
      alias="Umbraco.TextField"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-datatype-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-datatype-list-item
        name=${name}
        icon="bug"
        alias="Umbraco.TextField"
      >
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-datatype-list-item>`
    )}
  </uui-list>
`;
