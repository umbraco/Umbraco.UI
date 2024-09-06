import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-ref-node-document-type',
  component: 'uui-ref-node-document-type',
  title: 'Displays/References/Document Type',
  args: {
    name: 'Product Page',
    alias: 'productPage',
  },
  render: args =>
    html`<uui-ref-node-document-type ${spread(args)}
      >${renderSlots(args)}</uui-ref-node-document-type
    >`,
  decorators: [
    (Story: any) => html`<div style="max-width: 420px;">${Story()}</div>`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'actions slot': html`<uui-action-bar slot="actions"
      ><uui-button label="delete"
        ><uui-icon name="delete"></uui-icon></uui-button
    ></uui-action-bar>`,
  },
};
export const CustomIcon: Story = {
  args: {
    'icon slot': html`<uui-icon slot="icon" name="colorpicker"></uui-icon>`,
  },
};

export const Standalone: Story = {
  args: {
    standalone: true,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
