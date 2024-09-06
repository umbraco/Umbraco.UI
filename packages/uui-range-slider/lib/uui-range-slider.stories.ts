import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-range-slider',
  component: 'uui-range-slider',
  title: 'Inputs/Range Slider',
  args: {
    step: 10,
    min: 0,
    max: 100,
    value: '0,20',
    label: 'range',
  },
  render: args => html`<uui-range-slider ${spread(args)}></uui-range-slider>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const HiddenValues: Story = {
  args: {
    hideStepValues: true,
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
