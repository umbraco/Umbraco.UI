import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import type { UUITableRowElement } from './uui-table-row.element';

import '@umbraco-ui/uui-input/lib';
import './uui-table-row.element';
import readme from '../README.md?raw';

const meta: Meta<typeof UUITableRowElement> = {
  title: 'Layout/Table/Table Row',
  component: 'uui-table-row',
  id: 'uui-table-row',
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;

const Template: StoryFn<UUITableRowElement> = props => {
  return html`
    <uui-table>
      <uui-table-row
        ?selectable=${props.selectable}
        ?selectOnly=${props.selectOnly}>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row
        ?selectable=${props.selectable}
        ?selectOnly=${props.selectOnly}>
        <uui-table-cell>
          <uui-input placeholder="Type your own thing"></uui-input>
        </uui-table-cell>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  `;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

AAAOverview.parameters = {
  controls: {},
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

export const SelectableRows = Template.bind({});
SelectableRows.args = {
  selectable: true,
};
SelectableRows.parameters = {
  docs: {
    source: {
      code: `
<uui-table aria-label="Example table" aria-describedby="#some-element-id">

  <uui-table-row selectable>
    <uui-table-cell>Cell 1</uui-table-cell>
    <uui-table-cell>Cell 2</uui-table-cell>
  </uui-table-row>

  <uui-table-row selectable>
    <uui-table-cell>Cell 3</uui-table-cell>
    <uui-table-cell>Cell 4</uui-table-cell>
  </uui-table-row>

</uui-table>
      `,
    },
  },
};
