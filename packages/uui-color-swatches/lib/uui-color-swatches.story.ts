import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';
import { repeat } from 'lit/directives/repeat.js';

const swatches = [
  { label: 'Black', value: '#060606' },
  { label: 'Sunglow', value: '#fad634' },
  { label: 'Spanish Pink', value: '#f5c1bc' },
  { label: 'Violet Blue', value: '#3544b1' },
  { label: 'Malibu', value: '#3879ff' },
  { label: 'Maroon Flush', value: '#d42054' },
  { label: 'Jungle Green', value: '#2bc37c' },
  { label: 'Chamoisee', value: '#9d8057' },
  { label: 'Dusty Grey', value: '#9b9b9b' },
];

const swatchesTransparent = [
  'rgba(208, 2, 27, 0.5)',
  'rgba(245, 166, 35, 0.5)',
  'rgba(248, 231, 28, 0.5)',
  'rgba(139, 87, 42, 0.5)',
  'rgba(126, 211, 33, 0.5)',
  'rgba(65, 117, 5, 0.5)',
  'rgba(189, 16, 224, 0.5)',
  'rgba(144, 19, 254, 0.5)',
  'rgba(74, 144, 226, 0.5)',
  'rgba(80, 227, 194, 0.5)',
  'rgba(184, 233, 134, 0.5)',
  'rgba(0, 0, 0, 0.5)',
  'rgba(68, 68, 68, 0.5)',
  'rgba(136, 136, 136, 0.5)',
  'rgba(204, 204, 204, 0.5)',
  'rgba(255, 255, 255, 0.5)',
];

const gradients = [
  {
    label: 'Vital Ocean',
    value: 'ocean',
    color:
      'linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)',
  },
  {
    label: 'Disco Club',
    value: 'avocado',
    color:
      'radial-gradient(circle,rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)',
  },
  {
    label: 'Deep Sunset',
    value: 'sunset',
    color:
      'linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)',
  },
  {
    label: 'Bubble Gum',
    value: 'gum',
    color:
      'radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)',
  },
  {
    label: 'Blue Lagoon',
    value: 'lagoon',
    color:
      'linear-gradient(90deg,rgba(67, 198, 172, 1) 0%, rgba(25, 22, 84, 1) 100%)',
  },
  {
    label: 'Lemon Twist',
    value: 'lemon-twist',
    color:
      'linear-gradient(90deg,rgba(60, 165, 92, 1) 0%, rgba(181, 172, 73, 1) 100%)',
  },
];

const meta: Meta = {
  id: 'uui-color-swatches',
  component: 'uui-color-swatches',
  title: 'Inputs/Color/Color Swatches',
  args: {
    swatches: swatches,
  },
  argTypes: {
    value: { control: { type: 'color' } },
    showLabel: { control: { type: 'boolean' } },
  },
  // prettier-ignore
  render: (args: any) => html`
<uui-color-swatches
  ${spread(args, ['swatches', 'showLabel'])}
  label="My color palette">${repeat(args.swatches, (swatch: any) => {
    const label = typeof swatch === 'string' ? swatch : swatch.label;
    const value = typeof swatch === 'string' ? swatch : swatch.value;
    const color = typeof swatch === 'string' ? swatch : swatch.color;
    return html`
  <uui-color-swatch
    label="${label}"
    .showLabel=${args.showLabel}
    .color="${color}"
    .value=${value}>
  </uui-color-swatch>`;
  })}
</uui-color-swatches>
  `,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Preselected: Story = {
  args: {
    value: swatches[3].value,
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

export const ShowLabel: Story = {
  args: {
    showLabel: true,
  },
};

export const Gradient: Story = {
  args: {
    swatches: gradients,
    showLabel: true,
    value: 'lemon-twist',
  },
};

export const Transparent: Story = {
  args: {
    swatches: swatchesTransparent,
  },
};

export const NoSwatches: Story = {
  args: {
    swatches: [],
  },
};
