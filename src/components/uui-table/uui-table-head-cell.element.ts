import { css } from 'lit';
import { UUITableCellElement } from './uui-table-cell.element';

/**
 *  @element uui-table-head-cell
 *  @description Table head-cell element. Must be a child of <uui-table-head>
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
