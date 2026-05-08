import { LitElement, html, css } from 'lit';
/**
 *  A basic loader.
 *  @element uui-loader
 */
export class UUILoaderElement extends LitElement {
  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        color: var(--uui-color-default);
      }

      div {
        display: inline-block;
        width: var(--uui-size-2);
        height: var(--uui-size-2);
        border: 1px solid currentColor;
        box-shadow: 0 0 0 0.33px currentColor;
        border-radius: 100%;
        opacity: 0;
        animation: loaderAnimation 1.2s infinite;
        transition:
          transform 60ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
          opacity 60ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
          filter 60ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      div:nth-child(1n) {
        animation-delay: 0s;
      }

      div:nth-child(2n) {
        animation-delay: 0.15s;
      }

      div:nth-child(3n) {
        animation-delay: 0.3s;
      }

      @keyframes loaderAnimation {
        0% {
          transform: scale(0.33);
          background-color: currentColor;
          filter: blur(1.5px);
          opacity: 0.25;
        }
        33% {
          transform: scale(1);
          background-color: transparent;
          filter: blur(0px);

          opacity: 1;
        }
        50% {
          transform: scale(1);
          background-color: transparent;
          filter: blur(0px);

          opacity: 0.9;
        }
        100% {
          transform: scale(0.33);
          background-color: currentColor;
          filter: blur(1.5px);
          opacity: 0.25;
        }
      }
    `,
  ];
}
