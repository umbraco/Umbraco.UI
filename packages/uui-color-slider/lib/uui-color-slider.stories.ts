import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-color-slider',
  component: 'uui-color-slider',
  title: 'Inputs/Color/Color Slider',
  argTypes: {
    type: {
      options: ['hue', 'opacity'],
      control: { type: 'select' },
    },
  },
  render: args => html`<uui-color-slider ${spread(args)}></uui-color-slider>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Opacity: Story = {
  args: {
    type: 'opacity',
    color: '#0075ff',
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};
