import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/List Item/Content Node Card',
  component: 'uui-content-node-list-item',
};

export const Default = () => html`
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
