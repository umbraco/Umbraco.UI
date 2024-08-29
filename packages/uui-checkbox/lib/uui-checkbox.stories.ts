import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-checkbox',
  component: 'uui-checkbox',
  title: 'Inputs/Checkbox',
  argTypes: {
    labelPosition: { options: ['left', 'right', 'top', 'bottom'] },
  },
  render: props => html`<uui-checkbox ${spread(props)}></uui-checkbox>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
