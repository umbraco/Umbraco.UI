import { LitElement, html, css } from 'lit';

/**
 *  A basic loader.
 *  @element uui-loader
 */
export class UUILoaderElement extends LitElement {
  static styles = [
    css`
      :host {
        /* currently this components color is defined through currentColor, if we like to use a different color, we need to implemenet a --uui-interface- color which will be set/overwritten when looks are set, aka. if this element is used within a button with the look danger, then this component would get an appropriate color. */
      }

      div {
        display: inline-block;
        width: var(--uui-size-base-unit);
        height: var(--uui-size-base-unit);
        border: 2px solid currentColor;
        border-radius: 100%;
        animation: loaderAnimation 1.4s infinite;
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
          transform: scale(0.5);
          background-color: currentColor;
        }
        50% {
          transform: scale(1);
          background-color: transparent;
        }
        100% {
          transform: scale(0.5);
          background-color: currentColor;
        }
      }
    `,
  ];

  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
    `;
  }
}
