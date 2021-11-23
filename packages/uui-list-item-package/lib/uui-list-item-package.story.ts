import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-package/lib/index';

export default {
  id: 'uui-list-item-package',
  title: 'Displays/List Item/Package',
  component: 'uui-list-item-package',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-package></uui-list-item-package>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-package></uui-list-item-package>`;
