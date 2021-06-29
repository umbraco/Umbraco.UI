import { LitElement, css, html } from 'lit';
import { SelectableMixin } from '../../mixins/SelectableComponent';

export class UUITableRowElement extends SelectableMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: table-row;
        border-top: 1px solid #e9e9eb;
        --column-number: 3;
        position: relative;
      }

      :host([selected])::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-interface-select, #1b264f);
        border-radius: calc(var(--uui-size-border-radius, 3px) + 2px);
        box-shadow: 0 0 4px 0 var(--uui-interface-select, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-select, #1b264f);
      }

      ::slotted(uui-table-cell:nth-child(3)) {
        background-color: yellow;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
  }

  toggleSelect() {
    this.selected = !this.selected;
  }

  render() {
    return html`<slot></slot>`;
  }
}
