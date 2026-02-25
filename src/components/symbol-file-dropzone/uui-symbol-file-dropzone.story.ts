import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-file-dropzone',
  component: 'uui-symbol-file-dropzone',
  title: 'Symbols/File Dropzone',
  render: args =>
    html`<uui-symbol-file-dropzone ${spread(args)}></uui-symbol-file-dropzone>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};
