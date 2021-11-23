import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-member/lib/index';

export default {
  id: 'uui-list-item-member',
  title: 'Displays/List Item/Member',
  component: 'uui-list-item-member',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-member></uui-list-item-member>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-member></uui-list-item-member>`;
