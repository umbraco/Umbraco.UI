import { html } from 'lit-html';
import './index';
import { ArrayOfUmbracoWords } from '../../storybook/helper/UmbracoWordGenerator';

export default {
  title: 'Misc/Table',
  component: 'uui-table',
};

export const Basic = () =>
  html`
    <div id="table-decription">
      This is a table containing random Umbraco-related words with no particular
      connection between them. Hover on overflowed element to see it's value.
    </div>
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-decription"
    >
      <uui-table-column
        style="width: 50px; background-color: var(--uui-color-spanish-pink);"
      >
      </uui-table-column>
      <uui-table-column> </uui-table-column>
      <uui-table-column
        style="width: 25%; background-color: yellow; font-weight: 600"
      >
      </uui-table-column>
      <uui-table-head>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
    </uui-table>
  `;

export const SelectableRows = () =>
  html`
    <div style="width: 100%;">
      <uui-table>
        <uui-table-column
          style="width: 5%; min-width: 32px; max-width: 48px;"
        ></uui-table-column>
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
