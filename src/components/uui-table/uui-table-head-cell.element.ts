import { UUITableCellElement } from './uui-table-cell.element';

export class UUITableHeadCellElement extends UUITableCellElement {
  static styles = [UUITableCellElement.styles];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
  }
}
