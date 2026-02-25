import { css } from 'lit';

import { UUITableCellElement } from './table-cell.element';

/**
 * Child element of uui-table-head. Use it there.
 *  @element uui-table-head-cell
 */
export class UUITableHeadCellElement extends UUITableCellElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
  }

  static override readonly styles = [
    ...UUITableCellElement.styles,
    css`
      :host {
        border-top: none;
      }
    `,
  ];
}
