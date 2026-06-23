import './color-swatch.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';
import { useState } from 'storybook/preview-api';

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

const palette = [
  { value: '#d0021b', label: 'Red' },
  { value: '#f5a623', label: 'Orange' },
  { value: '#f8e71c', label: 'Yellow' },
  { value: '#7ed321', label: 'Lime' },
  { value: '#417505', label: 'Forest' },
  { value: '#4a90e2', label: 'Blue' },
  { value: '#7b68ee', label: 'Lavender' },
  { value: '#9013fe', label: 'Purple' },
  { value: '#bd10e0', label: 'Magenta' },
  { value: '#000000', label: 'Black' },
  { value: '#888888', label: 'Grey' },
  { value: '#ffffff', label: 'White' },
];

export const Palette: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return html`
      <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
        ${palette.map(
          ({ value, label }) => html`
            <uui-color-swatch
              value=${value}
              label=${label}
              selectable
              ?selected=${selected === value}
              @selected=${() => setSelected(value)}
              @deselected=${() => setSelected(null)}></uui-color-swatch>
          `,
        )}
      </div>
      <div style="font-family: monospace; font-size: 13px; color: #666;">
        ${selected
          ? html`Selected:
              <span style="font-weight: bold; color: #000;">${selected}</span>`
          : html`<span>Click a swatch to select it</span>`}
      </div>
    `;
  },
};
