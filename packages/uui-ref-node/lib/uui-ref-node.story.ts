import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node',
  title: 'Displays/References/Node',
  component: 'uui-ref-node',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node></uui-ref-node>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

export const Border = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere"
      border>
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      selectable
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

export const BorderAndSelectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      selectable
      border
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      disabled
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

export const BorderAndDisabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      border
      disabled
      name="Rabbit suit product page"
      icon="bug"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node
        name=${name}
        icon="bug"
        detail="path/to/nowhere">
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="delete"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-ref-node>`
    )}
  </uui-ref-list>
`;
