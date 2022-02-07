import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 *  Recreation of native table and it's child elements. `<uui-table>` is a parent element to `<uui-table-head>` `<and uui-table-row>`. To make it fully accessible remember to add aria-label and aria-describedby.
 *  @element uui-table
 *  @slot for uui-table-head and uui-table-row elements. Make a table out of them.
 */
@defineElement('uui-table')
export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table;
        width: 100%;
        border-radius: var(--uui-border-radius);
        background-color: var(--uui-interface-surface);
        cursor: default;
      }
    `,
  ];

  /* consider select-only attribute on this level? */

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-table': UUITableElement;
  }
}
