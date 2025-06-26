import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-button-group/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-color-area/lib';
import '@umbraco-ui/uui-color-slider/lib';
import '@umbraco-ui/uui-color-swatch/lib';
import '@umbraco-ui/uui-color-swatches/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-popover-container/lib';

const formats = ['hex', 'rgb', 'hsl', 'hsv'];
const sizes = ['small', 'medium', 'large'];

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

const meta: Meta = {
  id: 'uui-color-picker',
  component: 'uui-color-picker',
  title: 'Inputs/Color/Color Picker',
  argTypes: {
    format: {
      options: formats,
    },
    size: {
      options: sizes,
    },
    value: {
      control: { type: 'color' },
    },
  },
  render: args => html`<uui-color-picker ${spread(args)}></uui-color-picker>`,
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
    value: '#000000',
  },
};

export const Empty: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Formats: Story = {
  args: {
    format: 'hex',
    inline: true,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const Opacity: Story = {
  args: {
    opacity: true,
    value: undefined,
    inline: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};

export const NoSwatches: Story = {
  args: {
    swatches: [],
  },
};

export const TransparentSwatches: Story = {
  args: {
    opacity: true,
    swatches: swatchesTransparent,
  },
};
