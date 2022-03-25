import '.';
import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-combobox-list',
  title: 'Combobox List',
  component: 'uui-combobox-list',
  parameters: {
    docs: {
      source: {
        code: `<uui-combobox-list></uui-combobox-list>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-combobox-list></uui-combobox-list>`;
