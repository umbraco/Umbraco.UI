import { css, html, LitElement } from 'lit';

/**
 *  Recreation of native table and it's child elements. `<uui-table>` is a parent element to `<uui-table-head>` `<and uui-table-row>`. To make it fully accessible remember to add aria-label and aria-describedby.
 *  @element uui-table
 *  @slot - slot for `<uui-table-head>` and `<uui-table-row>` elements. Make a table out of them.
 */
export class UUITableElement extends LitElement {
  /* consider select-only attribute on this level? */

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    return html`<slot></slot>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: table;
        width: 100%;
        background-color: var(--uui-color-surface);

        overflow: clip;
        border-radius: var(--uui-border-radius-3);
        border-width: var(--uui-box-border-width, 1px);
        border-style: solid;
        border-color: var(--uui-color-divider-standalone);
      }
    `,
  ];
}
