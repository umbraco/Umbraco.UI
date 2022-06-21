import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { UUITableHeadCellElement } from './uui-table-head-cell.element';

export default {
  title: 'Layout/Table/Table Head Cell',
  component: 'uui-table-head-cell',
  id: 'uui-table-head-cell',
};

export const AAAOverview: Story<UUITableHeadCellElement> = props =>
  html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-head>
        <uui-table-head-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          Umbraco
        </uui-table-head-cell>
        <uui-table-head-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          Rocks
        </uui-table-head-cell>
        <uui-table-head-cell
          ?disable-child-interaction=${props.disableChildInteraction}
          ?no-padding=${props.noPadding}
          ?clip-text=${props.clipText}>
          ${props.slot}
        </uui-table-head-cell>
      </uui-table-head>
    </uui-table>
  `;
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  slot: 'Very very very Very very very Very very very Very very very Very very very long sentence',
};
AAAOverview.parameters = {
  controls: {
    include: ['disableChildInteraction', 'noPadding', 'clipText', 'slot'],
  },
  docs: {
    source: {
      code: `
<uui-table aria-label="Random Umbraco Words">
  <uui-table-head>
    <uui-table-head-cell>Cell 1</uui-table-head-cell>
    <uui-table-head-cell>Cell 2</uui-table-head-cell>
    <uui-table-head-cell>Cell 3</uui-table-head-cell>
  </uui-table-head>
</uui-table>
    `,
    },
  },
};
