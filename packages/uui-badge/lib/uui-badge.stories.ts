import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

import '@umbraco-ui/uui-icon-registry-essential';

const meta: Meta = {
  component: 'uui-badge',
  title: 'Displays/Badge',
  render: args => {
    return html`<uui-badge ${spread(args)}>2</uui-badge>`;
  },
  decorators: [
    story =>
      html`<uui-icon-registry-essential
        ><div
          style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.3)">
          ${story()}
        </div></uui-icon-registry-essential
      >`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
