import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Content Node Card',
  component: 'uui-content-node-list-item',
};

export const Default = () => html`
  <div style="width: 420px">
    <uui-content-node-list-item
      name="The card"
      icon="bug"
      url="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-content-node-list-item>
  </div>
`;
export const Selectable = () => html`
  <div style="width: 420px">
    <uui-content-node-list-item
      selectable
      name="The card"
      icon="bug"
      url="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-content-node-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="width: 420px">
    <uui-content-node-list-item
      disabled
      name="The card"
      icon="bug"
      url="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-content-node-list-item>
  </div>
`;

const listOfNodes: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <div style="width: 420px">
    ${listOfNodes.map(
      name => html`<uui-content-node-list-item
        name=${name}
        icon="bug"
        url="path/to/nowhere"
        style="margin-bottom:1px;"
      >
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-content-node-list-item>`
    )}
  </div>
`;
