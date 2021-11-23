import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-data-type/lib/index';

export default {
  id: 'uui-list-item-data-type',
  title: 'Displays/List Item/Data Type',
  component: 'uui-list-item-data-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-data-type></uui-list-item-data-type>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-data-type></uui-list-item-data-type>`;
