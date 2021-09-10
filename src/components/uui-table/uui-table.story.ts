import { html } from "lit-html";
import "./index";
import { ArrayOfUmbracoWords } from "../../storybook/helper/UmbracoWordGenerator";
import { Story } from "@storybook/web-components";

export default {
  title: "Misc/Table",
  component: "uui-table",
};

export const Overview: Story = (props) =>
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
        style="width: 50px;"
      >
      </uui-table-column>
      <uui-table-column> </uui-table-column>
      <uui-table-column
        style="width: 25%; font-weight: 600"
      >
      </uui-table-column>
      <uui-table-head>
        ${ArrayOfUmbracoWords(5).map(
          (el) => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(5).map(
          (el) => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(5).map(
          (el) => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
    </uui-table>
  `;
  
export const ColumnColors: Story = (props) =>
  html`
    <div id="table-decription">
      This is a table containing random Umbraco-related words with no particular
      connection between them. Hover on overflowed element to see it's value.
    </div>
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-decription"
    >
      <uui-table-column style="background-color: ${props.backgroundColor1}">
      </uui-table-column>
      <uui-table-column style="width: 40%; background-color: ${props.backgroundColor2}"> </uui-table-column>
      <uui-table-column
        style="width: 40%; background-color: ${props.backgroundColor3}"
      >
      </uui-table-column>
      <uui-table-head>
        ${ArrayOfUmbracoWords(3).map(
          (el) => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          (el) => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          (el) => html`<uui-table-cell>${el}</uui-table-cell>`
        )}
      </uui-table-row>
    </uui-table>
  `;
ColumnColors.args = { backgroundColor1: "#8d9fc2", backgroundColor2: "#afc0e1" ,backgroundColor3: "#c7d4ee" };
ColumnColors.argTypes = {
  backgroundColor1: { table: { category: "Column styling" }, control: "color" },
  backgroundColor2: { table: { category: "Column styling" }, control: "color" },
  backgroundColor3: { table: { category: "Column styling" }, control: "color" },
};
ColumnColors.parameters = {
  controls: {
    include: ["backgroundColor1", "backgroundColor2", "backgroundColor3"],
  },
};

export const SelectableRows: Story = (props) =>
  html`
    <div style="width: 100%;">
      <uui-table>
        <uui-table-column
          style="width: 5%; min-width: 32px; max-width: 48px;"
        ></uui-table-column>
        <uui-table-head>
          ${ArrayOfUmbracoWords(5).map(
            (el) => html`<uui-table-head-cell>${el}</uui-table-head-cell>`
          )}
        </uui-table-head>
        <uui-table-row selectable>
          ${ArrayOfUmbracoWords(5).map(
            (el) => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
        <uui-table-row selectable>
          ${ArrayOfUmbracoWords(5).map(
            (el) => html`<uui-table-cell>${el}</uui-table-cell>`
          )}
        </uui-table-row>
      </uui-table>
    </div>
  `;
