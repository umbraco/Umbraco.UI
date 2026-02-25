import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-file',
  component: 'uui-symbol-file',
  title: 'Symbols/File',
  args: {
    type: 'pdf',
  },
  render: args => html`<uui-symbol-file ${spread(args)}></uui-symbol-file>`,
  decorators: [story => html`<div style="width: 240px">${story()}</div>`],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
