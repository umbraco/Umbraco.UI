import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { UUITableCellElement } from './uui-table-cell.element';

export default {
  title: 'Layout/Table/Table Cell',
  component: 'uui-table-cell',
  id: 'uui-table-cell',
};

export const AAAOverview: Story<UUITableCellElement> = props =>
  html`
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
          ${props.slot}
        </uui-table-cell>
      </uui-table-row>
    </uui-table>
  `;
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
