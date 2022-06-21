import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

export default {
  title: 'Layout/Table/Table Row',
  component: 'uui-table-row',
  id: 'uui-table-row',
};

export const AAAOverview: Story = () =>
  html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
    </uui-table>
  `;
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

export const SelectableRows: Story = () =>
  html`
    <div style="width: 100%;">
      <uui-table>
        <uui-table-row selectable>
          ${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
        <uui-table-row selectable>
          ${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
      </uui-table>
    </div>
  `;

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
