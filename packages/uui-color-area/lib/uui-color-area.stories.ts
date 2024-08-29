import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-color-area',
  component: 'uui-color-area',
  title: 'Inputs/Color/Color Area',
  argTypes: {
    value: { control: 'color' },
  },
  render: props => html`<uui-color-area ${spread(props)}></uui-color-area>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
