import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-progress-bar',
  component: 'uui-progress-bar',
  title: 'Displays/Progress Bar',
  render: args => html`<uui-progress-bar ${spread(args)}></uui-progress-bar>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    progress: 50,
  },
};
