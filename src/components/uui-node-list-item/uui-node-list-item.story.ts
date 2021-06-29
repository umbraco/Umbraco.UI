import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Node List Item',
  component: 'uui-node-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-node-list-item
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-node-list-item>
  </div>
`;

export const PackageExample = () => html`
  <div style="max-width: 420px;">
    <uui-node-list-item
      name="Rabbit suit product page"
      icon="bug"
      version="1.0"
      author="Unicorn Devs"
    >
      <uui-tag size="s" slot="tag" look="warning">Upgrade available</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-node-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-node-list-item
      selectable
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-node-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-node-list-item
      disabled
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere"
    >
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-node-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-node-list-item
        name=${name}
        icon="bug"
        detail="path/to/nowhere"
      >
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-node-list-item>`
    )}
  </uui-list>
`;
