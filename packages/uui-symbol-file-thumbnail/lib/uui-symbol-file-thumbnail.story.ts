import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-symbol-file-thumbnail',
  title: 'Symbol File Thumbnail',
  component: 'uui-symbol-file-thumbnail',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>`;
