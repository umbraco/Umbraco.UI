import { LitElement, css, html } from 'lit';
import { SelectableMixin } from '../../mixins/SelectableComponent';

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
        outline: 2px solid var(--uui-interface-select, #1b264f);
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

  toggleSelect() {
    if (this.selectable === false) return;
    this.selected = !this.selected;
  }

  render() {
    return html`<slot></slot>`;
  }
}
