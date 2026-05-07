import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-icon-registry-essential/lib';

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

export const HasChildren: Story = {
  args: {
    hasChildren: true,
  },
};

export const TreeView: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: var(--uui-size-space-3);">
      <uui-card has-children active>
        <uui-icon slot="icon" name="document"></uui-icon>
        <div style="margin: var(--uui-size-space-4)">Item 1</div>
      </uui-card>
      <uui-card has-children>
        <uui-icon slot="icon" name="document"></uui-icon>
        <div style="margin: var(--uui-size-space-4)">Item 2</div>
      </uui-card>
      <uui-card>
        <uui-icon slot="icon" name="document"></uui-icon>
        <div style="margin: var(--uui-size-space-4)">Item 3</div>
      </uui-card>
      <uui-card>
        <uui-icon slot="icon" name="document"></uui-icon>
        <div style="margin: var(--uui-size-space-4)">Item 4</div>
      </uui-card>
      <uui-card>
        <uui-icon slot="icon" name="document"></uui-icon>
        <div style="margin: var(--uui-size-space-4)">Item 5</div>
      </uui-card>
      <uui-card>
        <div style="margin: var(--uui-size-space-4)">Item 6</div>
      </uui-card>
    </div>
  `,
};
