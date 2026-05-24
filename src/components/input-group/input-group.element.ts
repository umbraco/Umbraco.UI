import { css, html, LitElement } from 'lit';

/**
 * @element uui-input-group
 */
export class UUIInputGroupElement extends LitElement {
  render() {
    return html`
      <slot name="prepend"></slot>
      <slot></slot>
      <slot name="append"></slot>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
    }

    ::slotted(uui-input) {
      flex: 1;
    }
  `;
}
