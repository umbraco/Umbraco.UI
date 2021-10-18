import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-table/lib/index';
import '@umbraco-ui/uui-box/lib/index';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
  id: 'uui-table',
};

export const AAAOverview: Story = props =>
  html`
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
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
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

export const SelectableRows: Story = () =>
  html`
    <div style="width: 100%;">
      <uui-table>
        <uui-table-column
          style="width: 5%; min-width: 32px; max-width: 48px;"></uui-table-column>
        <uui-table-head>
          ${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
          )}
        </uui-table-head>
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
      code: ` <uui-table aria-label="Example table" aria-describedby="#some-element-id">
        
        <!-- Apply styles to the uui-table-column to style the columns. You must have the same number of this elements as you have columns -->
        <uui-table-column style="width: 20%; background-color: green"></uui-table-column>
        <uui-table-column style="width: 80%; background-color: red"></uui-table-column>
  
        <uui-table-head>
          <uui-table-head-cell>Title 1</uui-table-head-cell>
          <uui-table-head-cell>Title 2</uui-table-head-cell>
        </uui-table-head>
  
        <uui-table-row selectable>
          <uui-table-cell>Cell 1</uui-table-cell>
          <uui-table-cell>Cell 2</uui-table-cell>
        </uui-table-row>
  
        <uui-table-row selectable>
          <uui-table-cell>Cell 3</uui-table-cell>
          <uui-table-cell>Cell 4</uui-table-cell>
        </uui-table-row>
  
      </uui-table>`,
    },
  },
};

export const OverflowDetection: Story = () =>
  html`
    <h3>
      Overflowing text is indicated by three dots. <br />
      Hover over wrapped cells to see a title with full text
    </h3>
    <div style="width: 30%;">
      <uui-table>
        <uui-table-column
          style="width: 5%; min-width: 32px; max-width: 48px;"></uui-table-column>
        <uui-table-head>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
          )}
        </uui-table-head>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
      </uui-table>
    </div>
  `;

export const InABox: Story = () =>
  html`
    <uui-box>
      <uui-table>
        <uui-table-head>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
          )}
        </uui-table-head>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
      </uui-table>
    </uui-box>
  `;

SelectableRows.parameters = {
  docs: {
    source: {
      code: `
<uui-box>
  <uui-table aria-label="Example table" aria-describedby="#some-element-id">

    <uui-table-head>
      <uui-table-head-cell>Title 1</uui-table-head-cell>
      <uui-table-head-cell>Title 2</uui-table-head-cell>
    </uui-table-head>

    <uui-table-row selectable>
      <uui-table-cell>Cell 1</uui-table-cell>
      <uui-table-cell>Cell 2</uui-table-cell>
    </uui-table-row>

    <uui-table-row selectable>
      <uui-table-cell>Cell 3</uui-table-cell>
      <uui-table-cell>Cell 4</uui-table-cell>
    </uui-table-row>
    
  </uui-table>
</uui-box>`,
    },
  },
};
