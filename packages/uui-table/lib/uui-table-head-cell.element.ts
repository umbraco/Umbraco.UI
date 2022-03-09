import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css } from 'lit';

import { UUITableCellElement } from './uui-table-cell.element';

/**
 * Child element of uui-table-head. Use it there.
 *  @element uui-table-head-cell
 */
@defineElement('uui-table-head-cell')
export class UUITableHeadCellElement extends UUITableCellElement {
  static styles = [
    ...UUITableCellElement.styles,
    css`
      :host {
        border-top: none;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-head-cell': UUITableHeadCellElement;
  }
}
