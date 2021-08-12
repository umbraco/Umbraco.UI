import { css, LitElement } from 'lit';

/**
 *  @element uui-table-column
 *  @description Table column element. Equivalent of native <col>. Any styles you apply to it will be applied to the corresponding column in the table.
 */
export class UUITableColumnElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-column;
      }
    `,
  ];
}
