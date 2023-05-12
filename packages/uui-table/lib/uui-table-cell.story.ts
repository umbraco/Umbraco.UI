import type { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import type { UUITableCellElement } from './uui-table-cell.element';

import '@umbraco-ui/uui-input/lib';
import './uui-table-cell.element';

const meta: Meta<typeof UUITableCellElement> = {
  title: 'Layout/Table/Table Cell',
  component: 'uui-table-cell',
  id: 'uui-table-cell',
};

export default meta;

const Template: StoryFn<UUITableCellElement> = props => {
  return html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-row>
        <uui-table-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          Umbraco
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          Rocks
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          <uui-input placeholder="Type your own thing"></uui-input>
        </uui-table-cell>
        <uui-table-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          ${props.slot}
        </uui-table-cell>
      </uui-table-row>
    </uui-table>
  `;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  slot: 'Very very very Very very very Very very very Very very very Very very very long sentence',
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-table aria-label="Example table" aria-describedby="#some-element-id">

  <uui-table-row>
    <uui-table-cell>Cell 1</uui-table-cell>
    <uui-table-cell>Cell 2</uui-table-cell>
  </uui-table-row>

</uui-table>
    `,
    },
  },
};
