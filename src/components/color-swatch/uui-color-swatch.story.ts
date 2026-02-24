import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
  parameters: {
    readme: {
      markdown: readme,
    },
  },
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
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch disabled selectable></uui-color-swatch>`,
      },
    },
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    selected: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch readonly selectable></uui-color-swatch>`,
      },
    },
  },
};

export const ReadonlySelected: Story = {
  args: {
    readonly: true,
    selectable: true,
    selected: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch readonly selectable selected></uui-color-swatch>`,
      },
    },
  },
};

export const WithLabel: Story = {
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

export const Gradient: Story = {
  args: {
    value: 'sun',
    color: 'radial-gradient(orange, red)',
    label: 'Sun',
    showLabel: true,
  },
};
