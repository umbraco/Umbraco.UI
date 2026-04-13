import './visually-hidden.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  id: 'uui-visually-hidden',
  component: 'uui-visually-hidden',
  title: 'Displays/Visually Hidden',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html` Press tab to focus hidden link
      <uui-visually-hidden>
        <a href="#">Skip to main content</a>
      </uui-visually-hidden>`,
};
