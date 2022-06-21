import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

export default {
  title: 'Layout/Table/Table Head',
  component: 'uui-table-head',
  id: 'uui-table-head',
};

export const AAAOverview: Story = () =>
  html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-head>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
        )}
      </uui-table-head>
    </uui-table>
  `;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
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
