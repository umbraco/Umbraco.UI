import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-card',
  component: 'uui-card',
  title: 'Displays/Cards/Card',
};

export default meta;
type Story = StoryObj;

/**
 * Card is a Component that provides the basics for a Card component. This can be extended in code to match a certain need.
 */
export const Default: Story = {
  render: args => html`
    <uui-card ${spread(args)}>
      <div>
        <p>
          This is an example of a simple card. It can be used to display
          information in a structured way.
        </p>
      </div>
    </uui-card>
  `,
};
