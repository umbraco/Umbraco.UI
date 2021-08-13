import { LitElement, css, html } from 'lit';
import { SelectableMixin } from '../../mixins/SelectableComponent';

/**
 *  @element uui-table-row
 *  @description Table row element with option to set is as selectable. Parent for <uui-table-cell>. Must be a child of <uui-table>
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
        outline: 1px solid var(--uui-interface-select, #1b264f);
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  protected toggleSelect() {
    if (this.selectable === false) return;
    this.selected = !this.selected;
  }

  render() {
    return html`<slot></slot>`;
  }
}
