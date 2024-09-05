import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-toggle',
  component: 'uui-toggle',
  title: 'Inputs/Toggle',
  args: {
    label: 'label',
  },
  argTypes: {
    '--uui-toggle-size': { control: { type: 'text' } },
    '--uui-toggle-switch-width': { control: { type: 'text' } },
    '--uui-toggle-background-color': { control: { type: 'color' } },
    '--uui-toggle-border-color': { control: { type: 'color' } },
    '--uui-toggle-border-color-hover': { control: { type: 'color' } },
    '--uui-toggle-background-color-hover': { control: { type: 'color' } },
    '--uui-toggle-border-color-focus': { control: { type: 'color' } },
    '--uui-toggle-background-color-focus': { control: { type: 'color' } },
  },
  render: args =>
    html`<uui-toggle ${spread(args)}>${renderSlots(args)}</uui-toggle>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true },
  render: (args, { canvasElement }) => {
    setTimeout(() => {
      const toggle = canvasElement.querySelector('uui-toggle');
      if (!toggle) return;
      toggle.pristine = false;
    });
    return html`<uui-toggle ${spread(args)}>${renderSlots(args)}</uui-toggle>`;
  },
};

export const WithSlottedLabel: Story = {
  args: { slot: html`Using <b>Slot</b> for displayed label` },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Readonly: Story = {
  args: { readonly: true },
};

export const LabelPosition: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(4, 128px); align-items: center; justify-items: center">
      <uui-toggle label="Left" label-position="left"></uui-toggle>
      <uui-toggle label="Top" label-position="top"></uui-toggle>
      <uui-toggle label="Right" label-position="right"></uui-toggle>
      <uui-toggle label="Bottom" label-position="bottom"></uui-toggle>
    </div>
  `,
};
