import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-color-swatch',
  component: 'uui-color-swatch',
  title: 'Inputs/Color/Color Swatch',
  args: {
    value: '#d0021b',
  },
  argTypes: {
    value: { control: 'color' },
    color: { control: 'color' },
  },
  render: args =>
    html`<uui-color-swatch ${spread(args)}
      >${renderSlots(args)}</uui-color-swatch
    >`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const InvalidValue: Story = {
  args: {
    value: 'alsdakjshd',
    label: 'Invalid color',
    showLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    selected: true,
  },
};

export const Label: Story = {
  args: {
    label: 'Label',
    showLabel: true,
  },
};

export const SlottedLabel: Story = {
  args: {
    'label slot': html`<span slot="label">Slotted label</span>`,
    showLabel: true,
  },
};

export const Transparent: Story = {
  args: {
    value: 'rgba(209, 2, 26, 0.4)',
  },
};
