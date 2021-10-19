import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List Item/Package List Item',
  component: 'uui-package-list-item',
};

export const Default = () => html`
  <div style="max-width: 420px;">
    <uui-package-list-item
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-tag size="s" slot="tag" look="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-package-list-item>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-package-list-item
      selectable
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-package-list-item>
  </div>
`;
export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-package-list-item
      disabled
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-package-list-item>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-package-list-item
        name=${name}
        icon="bug"
        alias="Umbraco.TextField">
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-package-list-item>`
    )}
  </uui-list>
`;
