import { css, LitElement } from 'lit';

/**
 *  @element uui-table-column
 *  @description Table column element. Equivalent of native <col>. Any styles you apply to it will be applied to the corresponding column in the table. Must be achild of <uui-table></uui-table>. If you want to have unstyled column between two styled columns put this element into the markup without any styles applied to it.
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
