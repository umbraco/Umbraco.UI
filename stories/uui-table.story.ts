import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from './helper/UmbracoWordGenerator';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-table/lib/index';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
};

export const Overview: Story = props =>
  html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-decription">
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
Overview.args = {
  backgroundColor1: '#8d9fc2',
  backgroundColor2: '#afc0e1',
  backgroundColor3: '#c7d4ee',
};
Overview.argTypes = {
  backgroundColor1: { table: { category: 'Column styling' }, control: 'color' },
  backgroundColor2: { table: { category: 'Column styling' }, control: 'color' },
  backgroundColor3: { table: { category: 'Column styling' }, control: 'color' },
};
Overview.parameters = {
  controls: {
    include: ['backgroundColor1', 'backgroundColor2', 'backgroundColor3'],
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
