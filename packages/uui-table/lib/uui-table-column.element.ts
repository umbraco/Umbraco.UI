import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, LitElement } from 'lit';

/**
 * Table column element. Equivalent of native col. Any styles you apply to it will be applied to the corresponding column in the table. Must be a child of uui-table. If you want to have unstyled column between two styled columns put this element into the markup without any styles applied to it.
 *  @element uui-table-column
 */
@defineElement('uui-table-column')
export class UUITableColumnElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-column;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-column': UUITableColumnElement;
  }
}
