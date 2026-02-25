import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  id: 'uui-symbol-more',
  component: 'uui-symbol-more',
  title: 'Symbols/More',
  render: () => html`<uui-symbol-more></uui-symbol-more>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
