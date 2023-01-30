import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-symbol-file-dropzone',
  title: 'Symbols/File Dropzone',
  component: 'uui-symbol-file-dropzone',
};

export const Overview: Story = props =>
  html`<uui-symbol-file-dropzone
    ?error=${props.error}></uui-symbol-file-dropzone>`;

export const Default = () =>
  html` <uui-symbol-file-dropzone></uui-symbol-file-dropzone> `;

export const Error = () =>
  html` <uui-symbol-file-dropzone error></uui-symbol-file-dropzone> `;
