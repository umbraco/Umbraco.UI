import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-card',
  component: 'uui-card',
  title: 'Displays/Cards/Card',
  args: {
    slot: 'This is an example of a simple card',
  },
  render: args => html`
    <uui-card ${spread(args, ['slot'])}>${args.slot}</uui-card>
  `,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 300px));">
        ${Story()}
      </div>`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};
