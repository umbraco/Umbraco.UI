import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

/**
 *  @element uui-file-symbol
 */

export class UUIMoreSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        font-size: 12px;
        white-space: nowrap;
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
