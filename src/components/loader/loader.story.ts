import './loader.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  id: 'uui-loader',
  component: 'uui-loader',
  title: 'Loaders/Loader',
  args: {
    color: 'color: #006eff',
  },
  render: args => html`<uui-loader style="color: ${args.color}"></uui-loader>`,
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
