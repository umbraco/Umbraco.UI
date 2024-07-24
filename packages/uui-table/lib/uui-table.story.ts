import '.';
import './uui-table-advanced-example';
import '@umbraco-ui/uui-box/lib';

import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import readme from '../README.md?raw';

export default {
  title: 'Layout/Table/Table',
  component: 'uui-table',
  id: 'uui-table',
  subcomponents: {
    UUITableColumn: 'uui-table-column',
    UUITableHead: 'uui-table-head',
    UUITableHeadCell: 'uui-table-head-cell',
    UUITableRow: 'uui-table-row',
    UUITableCell: 'uui-table-cell',
  },
  parameters: {
    readme: { markdown: readme },
  },
} as Meta;

export const AAAOverview: Story = props => html`
  <uui-table
    aria-label="Random Umbraco Words"
    aria-describedby="table-description">
    <uui-table-column style="background-color: ${props.backgroundColor1}">
    </uui-table-column>
    <uui-table-column
      style="width: 40%; background-color: ${props.backgroundColor2}">
    </uui-table-column>
    <uui-table-column
      style="width: 40%; background-color: ${props.backgroundColor3}">
    </uui-table-column>
    <uui-table-head
      style="background-color: ${props.headBackgroundColor}; color: ${props.headColor}">
      ${ArrayOfUmbracoWords(3).map(
        el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
      )}
    </uui-table-head>
    <uui-table-row>
      ${ArrayOfUmbracoWords(3).map(
        el => html`<uui-table-cell>${el}</uui-table-cell>`,
      )}
    </uui-table-row>
    <uui-table-row>
      ${ArrayOfUmbracoWords(3).map(
        el => html`<uui-table-cell>${el}</uui-table-cell>`,
      )}
    </uui-table-row>
  </uui-table>
`;
AAAOverview.storyName = 'Overview';

AAAOverview.args = {
  headBackgroundColor: '',
  headColor: '',
  backgroundColor1: '',
  backgroundColor2: '',
  backgroundColor3: '',
};
AAAOverview.argTypes = {
  headBackgroundColor: {
    name: 'Table Head Background Color',
    table: { category: 'Styling' },
    control: 'color',
  },
  headColor: {
    name: 'Table Head Color',
    table: { category: 'Styling' },
    control: 'color',
  },
  backgroundColor1: {
    name: 'Column 1 Background Color',
    table: { category: 'Styling' },
    control: 'color',
  },
  backgroundColor2: {
    name: 'Column 2 Background Color',
    table: { category: 'Styling' },
    control: 'color',
  },
  backgroundColor3: {
    name: 'Column 3 Background Color',
    table: { category: 'Styling' },
    control: 'color',
  },
};
AAAOverview.parameters = {
  controls: {
    include: [
      'Table Head Background Color',
      'Table Head Color',
      'Column 1 Background Color',
      'Column 2 Background Color',
      'Column 3 Background Color',
    ],
  },
  docs: {
    source: {
      code: ` <uui-table aria-label="Example table" aria-describedby="#some-element-id">

      <!-- Apply styles to the uui-table-column to style the columns. You must have the same number of this elements as you have columns -->
      <uui-table-column style="width: 20%; background-color: green"></uui-table-column>
      <uui-table-column style="width: 80%; background-color: red"></uui-table-column>

      <uui-table-head>
        <uui-table-head-cell>Title 1</uui-table-head-cell>
        <uui-table-head-cell>Title 2</uui-table-head-cell>
      </uui-table-head>

      <uui-table-row>
        <uui-table-cell>Cell 1</uui-table-cell>
        <uui-table-cell>Cell 2</uui-table-cell>
      </uui-table-row>

      <uui-table-row>
        <uui-table-cell>Cell 3</uui-table-cell>
        <uui-table-cell>Cell 4</uui-table-cell>
      </uui-table-row>

    </uui-table>`,
    },
  },
};

export const OverflowDetection: Story = () => html`
  <h5>
    Overflowing text is indicated by three dots. <br />
    Hover over wrapped cells to see a title with full text
  </h5>
  <div style="width: 30%;">
    <uui-table>
      <uui-table-column
        style="width: 5%; min-width: 32px; max-width: 48px;"></uui-table-column>
      <uui-table-head>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-cell clip-text>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-cell clip-text>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  </div>
`;

OverflowDetection.parameters = {
  docs: {
    source: {
      code: `
  <uui-table aria-label="Example table" aria-describedby="#some-element-id">

    <uui-table-head>
      <uui-table-head-cell>Title 1</uui-table-head-cell>
      <uui-table-head-cell>Title 2</uui-table-head-cell>
    </uui-table-head>

    <uui-table-row>
      <uui-table-cell clip-text>Cell 1</uui-table-cell>
      <uui-table-cell clip-text>Cell 2</uui-table-cell>
    </uui-table-row>

    <uui-table-row>
      <uui-table-cell clip-text>Cell 3</uui-table-cell>
      <uui-table-cell clip-text>Cell 4</uui-table-cell>
    </uui-table-row>

  </uui-table>`,
    },
  },
};

export const InABox: Story = () => html`
  <uui-box style="--uui-box-default-padding: 0;">
    <uui-table>
      <uui-table-head>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(7).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  </uui-box>
`;

InABox.parameters = {
  docs: {
    source: {
      code: `
<uui-box style="--uui-box-default-padding: 0;">
  <uui-table>
    ...
  </uui-table>
</uui-box>`,
    },
  },
};

export const Advanced: Story = () =>
  html`<uui-table-with-selection-example></uui-table-with-selection-example>`;

Advanced.parameters = {
  docs: {
    source: {
      code: `
Take a look at the source code for the advanced example:
https://github.com/umbraco/Umbraco.UI/blob/v1/contrib/packages/uui-table/lib/uui-table-advanced-example.ts
      `,
    },
  },
};
