import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-slider',
  component: 'uui-slider',
  title: 'Inputs/Slider',
  args: {
    min: -100,
    max: 100,
    step: 1,
    label: 'Slider label',
    value: 0,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'number' },
    },
  },
  render: args => html`<uui-slider ${spread(args)}></uui-slider>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const HiddenValues: Story = {
  args: {
    hideStepValues: true,
    min: 0,
    max: 10,
    step: 1,
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
