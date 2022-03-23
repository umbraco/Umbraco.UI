import '.';
import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-select-list',
  title: 'Select List',
  component: 'uui-select-list',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-list></uui-select-list>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-select-list></uui-select-list>`;
