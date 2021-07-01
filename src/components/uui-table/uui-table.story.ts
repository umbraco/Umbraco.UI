import { html } from 'lit-html';
import './index';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
};

export const Basic = () =>
  html`
    <uui-table>
      <uui-table-column
        style="width: 10px; background-color: green;"
      ></uui-table-column>
      <uui-table-head
        >${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}</uui-table-head
      ><uui-table-row
        >${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}</uui-table-row
      ><uui-table-row
        >${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}</uui-table-row
      ></uui-table
    >
  `;

export const SelectableRows = () =>
  html`
    <div style="width: 100%;">
      <uui-table>
        <uui-table-column style="width: 5%;"></uui-table-column>
        <uui-table-head
          >${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}</uui-table-head
        ><uui-table-row selectable
          >${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}</uui-table-row
        ><uui-table-row selectable
          >${ArrayOfUmbracoWords(5).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`
          )}</uui-table-row
        ></uui-table
      >
    </div>
  `;
