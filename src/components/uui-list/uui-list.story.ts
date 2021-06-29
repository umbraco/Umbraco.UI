import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/List',
  component: 'uui-list',
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const ContentListItems = () => html`
  <uui-list style="max-width: 640px;">
    ${listOfNodeNames.map(
      name => html`<uui-content-node-list-item
        name=${name}
        icon="bug"
        url="path/to/nowhere"
      >
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-content-node-list-item>`
    )}
  </uui-list>
`;
