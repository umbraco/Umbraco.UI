import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
/**
 * @element uui-symbol-more
 */
@defineElement('uui-symbol-more')
export class UUISymbolMoreElement extends LitElement {
  render() {
    return html`···`;
  }

  static styles = [
    css`
      :host {
        display: inline-block;
        font-size: 1.48em;
        line-height: 0.8em;
        user-select: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-more': UUISymbolMoreElement;
  }
}
