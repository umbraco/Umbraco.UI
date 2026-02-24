import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-file-thumbnail',
  component: 'uui-symbol-file-thumbnail',
  title: 'Symbols/File Thumbnail',
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Image alt',
  },
  render: args =>
    html`<uui-symbol-file-thumbnail
      ${spread(args)}></uui-symbol-file-thumbnail>`,
  decorators: [
    story =>
      html`<div style="max-width: 300px; max-height: 300px">${story()}</div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const NoSource: Story = {
  args: {
    src: undefined,
    alt: 'Image alt',
  },
};
