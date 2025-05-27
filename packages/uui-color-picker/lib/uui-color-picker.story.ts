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
