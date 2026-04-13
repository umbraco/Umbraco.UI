import './card.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-card',
  component: 'uui-card',
  title: 'Displays/Cards/Card',
  args: {
    slot: '<div style="margin: var(--uui-size-space-4)">This is an example of a simple card <a href="#link">with a link</a>.</div>',
  },
  render: args =>
    html`<uui-card ${spread(args)}>${renderSlots(args)}</uui-card>`,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 300px));">
        ${Story()}
      </div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};
