import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-box',
  component: 'uui-box',
  title: 'Layout/Box',
  args: {},
  argTypes: {
    headlineVariant: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headline: 'Headline',
  },
  render: args => {
    return html`<uui-box ${spread(args)}>
      <p>Some content of this box, appended in the default slot.</p>
      <p>The headline is currently rendered as a ${args.headlineVariant}.</p>
    </uui-box>`;
  },
};
