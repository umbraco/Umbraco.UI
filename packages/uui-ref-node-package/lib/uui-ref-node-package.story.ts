import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-package',
  title: 'Displays/References/Package',
  component: 'uui-ref-node-package',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-package></uui-ref-node-package>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-tag size="s" slot="tag" look="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      selectable
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      disabled
      name="TextField"
      icon="bug"
      version="1.2"
      author="Unicorn Devs">
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="bug"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-package
        name=${name}
        icon="bug"
        alias="Umbraco.TextField">
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <uui-action-bar slot="actions"
          ><uui-button><uui-icon name="bug"></uui-icon></uui-button
        ></uui-action-bar>
      </uui-ref-node-package>`
    )}
  </uui-ref-list>
`;
