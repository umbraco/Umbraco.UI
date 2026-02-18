import { defineElement } from '../../internal/registration';
import { css, html, LitElement } from 'lit';

/**
 *  Table head element. Holds the styles for table head. Parent to uui-table-head-cell.
 *  @element uui-table-head
 *  @slot - slot for uui-table-head-cell elements.
 */
@defineElement('uui-table-head')
export class UUITableHeadElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        display: table-header-group;
        font-weight: bold;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-head': UUITableHeadElement;
  }
}
