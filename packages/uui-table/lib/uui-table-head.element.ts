import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 *  Table head element. Holds the styles for table head. Parent to uui-table-head-cell.
 *  @element uui-table-head
 *  @slot for uui-table-head-cell elements.
 */
@defineElement('uui-table-head')
export class UUITableHeadElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-header-group;
        font-weight: bold;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-head': UUITableHeadElement;
  }
}
