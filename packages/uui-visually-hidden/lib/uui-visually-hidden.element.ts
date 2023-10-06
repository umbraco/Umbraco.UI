import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-visually-hidden
 */
@defineElement('uui-visually-hidden')
export class UUIVisuallyHiddenElement extends LitElement {
  static styles = [
    css`
      :host(:not(:focus-within)) {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        clip: rect(0 0 0 0) !important;
        clip-path: inset(50%) !important;
        border: none !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        padding: 0 !important;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-visually-hidden': UUIVisuallyHiddenElement;
  }
}
