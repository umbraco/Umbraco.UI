import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-file-symbol
 */

export class UUIMoreSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-size: 0.8em;
        vertical-align: top;
        margin-top: 0.27em;
        line-height: 1em;
      }
      :host[size='small'] {
        font-size: 9px;
      }
    `,
  ];

  @property({ type: String })
  type = '';

  render() {
    return html`•••`;
  }
}
