import { LitElement, html, css } from 'lit-element';

/**
 *  @element uui-loader
 */

export class UUILoaderElement extends LitElement {
  static styles = [
    css`
      .bubble {
        display: inline-block;
        width: var(--uui-size-base-unit);
        height: var(--uui-size-base-unit);
        border-radius: 100%;
        border: 2px solid currentColor;
        animation: loaderAnimation 1.4s infinite;
      }

      .bubble:nth-child(1n) {
        animation-delay: 0s;
      }

      .bubble:nth-child(2n) {
        animation-delay: 0.15s;
      }

      .bubble:nth-child(3n) {
        animation-delay: 0.3s;
      }

      @keyframes loaderAnimation {
        0% {
          transform: scale(0.5);
          background: currentColor;
        }
        50% {
          transform: scale(1);
          background: transparent;
        }
        100% {
          transform: scale(0.5);
          background: currentColor;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    `;
  }
}
