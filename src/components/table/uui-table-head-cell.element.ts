import { defineElement } from '../../internal/registration';
import { css } from 'lit';

import { UUITableCellElement } from './uui-table-cell.element';

/**
 * Child element of uui-table-head. Use it there.
 *  @element uui-table-head-cell
 */
@defineElement('uui-table-head-cell')
export class UUITableHeadCellElement extends UUITableCellElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
  }

  static styles = [
    ...UUITableCellElement.styles,
    css`
      :host {
        border-top: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-head-cell': UUITableHeadCellElement;
  }
}
