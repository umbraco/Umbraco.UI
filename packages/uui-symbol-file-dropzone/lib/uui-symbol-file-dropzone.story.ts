import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-symbol-file-dropzone',
  title: 'Symbols/Symbol File Dropzone',
  component: 'uui-symbol-file-dropzone',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-file-dropzone></uui-symbol-file-dropzone>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-symbol-file-dropzone></uui-symbol-file-dropzone>`;

export const Default = () =>
  html` <uui-symbol-file-dropzone></uui-symbol-file-dropzone> `;

export const Error = () =>
  html` <uui-symbol-file-dropzone error></uui-symbol-file-dropzone> `;
