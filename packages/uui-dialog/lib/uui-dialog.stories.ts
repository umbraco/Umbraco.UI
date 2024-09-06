import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

/**
 * All-round dialog, often used with the [uui-dialog-layout](/docs/uui-dialog-layout--docs) component
 */
const meta: Meta = {
  id: 'uui-dialog',
  component: 'uui-dialog',
  title: 'Displays/Dialog/Dialog',
  render: args =>
    html`<uui-dialog ${spread(args)}>${renderSlots(args)}</uui-dialog>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    slot: html`<div style="padding: 32px">Dialog content</div>`,
  },
};
