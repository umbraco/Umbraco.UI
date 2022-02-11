import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-dialog-layout',
  title: 'Displays/Dialog/Dialog Layout',
  component: 'uui-dialog-layout',
  parameters: {
    docs: {
      source: {
        code: `<uui-dialog-layout></uui-dialog-layout>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-dialog-layout></uui-dialog-layout>`;
