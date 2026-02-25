import { css, html, LitElement } from 'lit';

/**
 * @element uui-visually-hidden
 */
export class UUIVisuallyHiddenElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

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
}
