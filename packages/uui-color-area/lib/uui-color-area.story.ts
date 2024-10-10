import '.';
import readme from '../README.md?raw';
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
  render: args => html`<uui-color-area ${spread(args)}></uui-color-area>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
