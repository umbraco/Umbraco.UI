import { css } from 'lit';
import { UUITableCellElement } from './uui-table-cell.element';

/**
 *  @element uui-table-head-cell
 *  @description Table head-cell element.
 */
export class UUITableHeadCellElement extends UUITableCellElement {
  static styles = [
    UUITableCellElement.styles,
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
