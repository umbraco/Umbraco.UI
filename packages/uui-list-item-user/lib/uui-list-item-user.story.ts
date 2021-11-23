import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-user/lib/index';

export default {
  id: 'uui-list-item-user',
  title: 'Displays/List Item/User',
  component: 'uui-list-item-user',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-user></uui-list-item-user>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-user></uui-list-item-user>`;
