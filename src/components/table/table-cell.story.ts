import './table.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../input/input.js';

const meta: Meta = {
  id: 'uui-table-cell',
  component: 'uui-table-cell',
  title: 'Layout/Table/Table Cell',
  args: {
    slot: 'Very very very Very very very Very very very Very very very Very very very long sentence',
  },
  render: args => html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-row>
        <uui-table-cell
          ?disable-child-interaction=${args.disableChildInteraction}
          ?no-padding=${args.noPadding}
          ?clip-text=${args.clipText}>
          Umbraco
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${args.disableChildInteraction}
          ?no-padding=${args.noPadding}
          ?clip-text=${args.clipText}>
          Rocks
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${args.disableChildInteraction}
          ?no-padding=${args.noPadding}
          ?clip-text=${args.clipText}>
          <uui-input placeholder="Type your own thing"></uui-input>
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${args.disableChildInteraction}
          ?no-padding=${args.noPadding}
          ?clip-text=${args.clipText}>
          ${args.slot}
        </uui-table-cell>
      </uui-table-row>
    </uui-table>
  `,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
