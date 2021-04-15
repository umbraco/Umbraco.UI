import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-file-symbol
 */

export class UUIFileSymbolElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        box-sizing: border-box;
        position: relative;
        max-width: 100px;
        font-size: 12px;
      }

      #file-type {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 10%;

        padding: 0 1em;
        font-weight: 800;
        color: var(--uui-color-gunmetal, #162335);
        background-color: var(--uui-color-spanish-pink, #f5c1bc);
      }

      #icon {
        fill: var(--uui-interface-border, lightgray);
      }
    `,
  ];

  @property({})
  type = '';

  render() {
    return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        id="icon"
      >
        <path
          d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"
        />
      </svg>
      <span id="file-type">${this.type.toUpperCase()}</span> `;
  }
}
