import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';
import { repeat } from 'lit/directives/repeat.js';

const swatchesColor = [
  { label: 'Blood Orange', value: '#d0021b' },
  { label: 'Avocado', value: '#417505' },
  { label: 'Tufts Blue', value: '#4a90e2' },
];

const meta: Meta = {
  id: 'uui-color-swatches',
  component: 'uui-color-swatches',
  title: 'Inputs/Color/Color Swatches',
  args: {
    swatches: swatchesColor,
  },
  argTypes: {
    value: { control: { type: 'color' } },
    showLabel: { control: { type: 'boolean' } },
  },
  // prettier-ignore
  render: (args: any) => html`
<uui-color-swatches
  ${spread(args, ['swatches', 'showLabel'])}
  label="My color pallette">${repeat(args.swatches, (swatch: any) => {
    const label = typeof swatch === 'string' ? swatch : swatch.label;
    const value = typeof swatch === 'string' ? swatch : swatch.value;
    return html`
  <uui-color-swatch
    label="${label}"
    .showLabel=${args.showLabel}
    .value=${value}></uui-color-swatch>`;
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
    value: '#417505',
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
