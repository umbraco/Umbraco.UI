import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item/lib/index';

export default {
  id: 'uui-list-item',
  title: 'Displays/List Item/Base',
  component: 'uui-list-item',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item></uui-list-item>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`
    <p>
      Base List Item is a Component that provides the basics for a List Item.
      This can be extended in code to match a certain need.
    </p>
  `;
