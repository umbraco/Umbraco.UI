import { LitElement, html, css } from 'lit';
/**
 * @element uui-symbol-more
 */
export class UUISymbolMoreElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-size: 0.8em;
        vertical-align: top;
        margin-top: 0.27em;
        line-height: 1em;
        user-select: none;
      }
    `,
  ];

  render() {
    return html`•••`;
  }
}
