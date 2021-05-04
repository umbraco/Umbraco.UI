import { html, css, LitElement } from 'lit';

/**
 *  @element uui-lead
 *  @slot - For content
 *  @description - Lead paragraph element, to make a paragraph gain more attention.
 */

export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        margin-bottom: var(--uui-size-medium);
      }
      ::slotted(table) {
        width: 100%;
        margin: 0;
        padding: 0;
        border: solid 1px #ddeeee;
        border-collapse: collapse;
        border-spacing: 0;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
