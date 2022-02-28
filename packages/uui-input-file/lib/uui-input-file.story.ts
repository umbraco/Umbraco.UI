import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-input-file',
  title: 'Input File',
  component: 'uui-input-file',
  parameters: {
    docs: {
      source: {
        code: `<uui-input-file></uui-input-file>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-input-file></uui-input-file>`;
