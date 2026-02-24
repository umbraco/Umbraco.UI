import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-progress-bar',
  component: 'uui-progress-bar',
  title: 'Displays/Progress Bar',
  render: args => html`<uui-progress-bar ${spread(args)}></uui-progress-bar>`,
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
    progress: 50,
  },
};
