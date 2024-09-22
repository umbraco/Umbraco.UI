import type { Meta, StoryObj } from '@storybook/web-components';
import type { UUIColorSliderElement } from './uui-color-slider.element';
import readme from '../README.md?raw';

import './uui-color-slider.element';

const types = ['hue', 'opacity'];

const meta: Meta<UUIColorSliderElement> = {
  id: 'uui-color-slider',
  title: 'Inputs/Color/Color Slider',
  component: 'uui-color-slider',
  args: {
    min: 0,
    max: 100,
    vertical: false,
    disabled: false,
    label: 'Color Slider',
    precision: 1,
    value: 0,
    type: 'hue',
    color: '',
  },
  argTypes: {
    type: {
      options: types,
      control: { type: 'select' },
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-color-slider></uui-color-slider>`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<UUIColorSliderElement>;

export const Overview: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 50,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-slider label="Slider label" disabled></uui-color-slider>`,
      },
    },
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: 50,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-slider label="Slider label" readonly></uui-color-slider>`,
      },
    },
  },
};

export const Opacity: Story = {
  args: {
    type: 'opacity',
    color: '#417505',
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const VerticalOpacity: Story = {
  args: {
    type: 'opacity',
    vertical: true,
    color: '#417505',
  },
};
