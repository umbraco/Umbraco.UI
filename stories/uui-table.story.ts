import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from './helper/UmbracoWordGenerator';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-table/lib/index';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
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
      <uui-table-head>
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
  backgroundColor1: '#8d9fc2',
  backgroundColor2: '#afc0e1',
  backgroundColor3: '#c7d4ee',
};
AAAOverview.argTypes = {
  backgroundColor1: { table: { category: 'Column styling' }, control: 'color' },
  backgroundColor2: { table: { category: 'Column styling' }, control: 'color' },
  backgroundColor3: { table: { category: 'Column styling' }, control: 'color' },
};
AAAOverview.parameters = {
  controls: {
    include: ['backgroundColor1', 'backgroundColor2', 'backgroundColor3'],
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
