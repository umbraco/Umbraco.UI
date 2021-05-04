import { html, css, LitElement } from 'lit';

/**
 *  @element uui-lead
 *  @slot - For content
 *  @description - Lead paragraph element, to make a paragraph gain more attention.
 */

export class UUILeadElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-size: 20px;
        padding-top: 2px;
        padding-bottom: 4px;
        margin-top: var(--uui-size-large);
        margin-bottom: var(--uui-size-medium);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
