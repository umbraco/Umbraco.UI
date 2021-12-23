import { LitElement, css, html } from 'lit';
import { SelectableMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUITableRowEvent } from './UUITableRowEvent';

/**
 *  Table row element with option to set is as selectable. Parent for uui-table-cell. Must be a child of uui-table.
 *  @element uui-table-row
 *  @slot for <uui-table-cell> elements that should be in the row.
 */
export class UUITableRowElement extends SelectableMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: table-row;
        position: relative;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([selected]) {
        outline: 2px solid var(--uui-interface-select);
        outline-offset: -2px;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this._toggleSelect);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  private _toggleSelect() {
    if (this.selectable === false) return;
    this.selected = !this.selected;

    this.dispatchEvent(
      new UUITableRowEvent(
        this.selected ? UUITableRowEvent.SELECTED : UUITableRowEvent.UNSELECTED
      )
    );
  }

  render() {
    return html`<slot></slot>`;
  }
}
