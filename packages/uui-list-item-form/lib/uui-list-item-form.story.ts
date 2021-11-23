import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-form/lib/index';

export default {
  id: 'uui-list-item-form',
  title: 'Displays/List Item/Form',
  component: 'uui-list-item-form',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-form></uui-list-item-form>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-form></uui-list-item-form>`;
