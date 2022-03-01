import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-symbol-file-thumbnail
 */
@defineElement('uui-symbol-file-thumbnail')
export class UUISymbolFileThumbnailElement extends LitElement {
  static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

  render() {
    return html` Markup goes here `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-symbol-file-thumbnail': UUISymbolFileThumbnailElement;
  }
}
