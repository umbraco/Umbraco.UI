import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-color-area',
  title: 'Color Area',
  component: 'uui-color-area',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-area></uui-color-area>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-color-area></uui-color-area>`;
