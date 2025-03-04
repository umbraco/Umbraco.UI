import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-loader-bar',
  component: 'uui-loader-bar',
  title: 'Loaders/Loader Bar',
  args: {
    color: '#006eff',
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    animationDuration: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
  render: args =>
    html`<uui-loader-bar
      style="color: ${args.color}"
      ${spread(args, ['color'])}></uui-loader-bar>`,
  parameters: {
    readme: {
      markdown: readme,
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Progress: Story = {
  args: {
    progress: 50,
  },
};
