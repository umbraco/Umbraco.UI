import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-node/lib/index';

export default {
  id: 'uui-list-item-node',
  title: 'Displays/List Item/Node',
  component: 'uui-list-item-node',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-node></uui-list-item-node>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-node></uui-list-item-node>`;
