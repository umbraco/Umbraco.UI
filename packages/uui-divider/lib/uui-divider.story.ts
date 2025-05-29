import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-divider.element';
import readme from '../README.md?raw';
import type { UUIDividerElement } from './uui-divider.element';
import { html } from 'lit';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta<UUIDividerElement> = {
  id: 'uui-divider',
  title: 'Displays/Divider',
  component: 'uui-divider',
  render: args =>
    html`<uui-divider ${spread(args)}>${renderSlots(args)}</divider>`,
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-divider></uui-divider>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIDividerElement>;

export const Overview: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: args => {
    return html`
      <div style="display: flex; align-items: center; height: 400px">
        <uui-divider ${spread(args)}>${renderSlots(args)}></uui-divider>
      </div>
    `;
  },
};

export const Color: Story = {
  render: () => {
    return html`
      <uui-divider
        style="--uui-divider-color: var(--uui-palette-space-cadet);"></uui-divider>
    `;
  },
};

export const Width: Story = {
  render: () => {
    return html`
      <uui-divider style="--uui-divider-width: 4px;"></uui-divider>
    `;
  },
};

export const Spacing: Story = {
  render: () => {
    return html`
      <div style="text-align: center;">
        Above
        <uui-divider style="--uui-divider-spacing: 1rem;"></uui-divider>
        Below
      </div>
    `;
  },
};
