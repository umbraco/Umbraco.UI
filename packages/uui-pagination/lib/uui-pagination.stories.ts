import '.';
import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-pagination',
  component: 'uui-pagination',
  title: 'Buttons/Pagination',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    total: 100,
    current: 1,
  },
  render: args => html`
    <p>
      Resize the container to see how the number of pagination buttons changes.
    </p>
    <div style="resize: horizontal; overflow: hidden; padding: 6px;">
      <uui-pagination ${spread(args)}></uui-pagination>
    </div>
  `,
};
