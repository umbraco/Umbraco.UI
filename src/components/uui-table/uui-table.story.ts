import { html } from 'lit-html';
import './index';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
};

export const Basic = () =>
  html`
    <uui-table
      ><uui-table-head
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell></uui-table-head
      ><uui-table-row
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell></uui-table-row
      ><uui-table-row
        ><uui-table-cell>Hello</uui-table-cell><uui-table-cell></uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell
        ><uui-table-cell>Hello</uui-table-cell></uui-table-row
      ></uui-table
    >
  `;
