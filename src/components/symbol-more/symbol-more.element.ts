import { LitElement, svg, css } from 'lit';
/**
 * @element uui-symbol-more
 */
export class UUISymbolMoreElement extends LitElement {
  render() {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="17" cy="50" r="9"></circle>
      <circle cx="50" cy="50" r="9"></circle>
      <circle cx="83" cy="50" r="9"></circle>
    </svg>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      svg {
        fill: currentColor;
      }
    `,
  ];
}
