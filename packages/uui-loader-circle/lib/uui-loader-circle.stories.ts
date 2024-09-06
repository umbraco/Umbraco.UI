import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-loader-circle',
  component: 'uui-loader-circle',
  title: 'Loaders/Loader Circle',
  args: {
    color: '#006eff',
    'font-size': '2em',
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    animationDuration: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
  render: args =>
    html`<uui-loader-circle
      style="color: ${args.color}; font-size: ${args['font-size']}"
      ${spread(args, ['color', 'font-size'])}></uui-loader-circle>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Size: Story = {
  args: {
    'font-size': '6em',
  },
};

export const Progress: Story = {
  args: {
    progress: 50,
  },
};
