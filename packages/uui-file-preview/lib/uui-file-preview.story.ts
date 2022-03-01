import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-file-preview',
  title: 'File Preview',
  component: 'uui-file-preview',
  parameters: {
    docs: {
      source: {
        code: `<uui-file-preview></uui-file-preview>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-file-preview></uui-file-preview>`;
