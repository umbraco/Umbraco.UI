import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-loader-bar
 * @description - Linear loader for indicating loading.
 */

// TODO try changing brightness hack to opacity
export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      :host {
        /* currently this components color is defined through currentColor, if we like to use a different color, we need to implemenet a --uui-interface- color which will be set/overwritten when looks are set, aka. if this element is used within a button with the look danger, then this component would get an appropriate color. */
        display: block;
        position: relative;
        height: var(--uui-size-half-base-unit, 3px);
        overflow: hidden;
        border-radius: var(--uui-size-half-base-unit, 3px);
        transform: scaleY(1);
        transform-origin: 0 50%;
        background-color: currentColor;
        transition: transform 300ms ease-in;
      }

      :host([hidden]) {
        transform: scaleY(0);
      }

      #bar1 {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: currentColor;
        transform-origin: top left;
        animation: translate-bar 1.5s infinite linear;
      }

      @keyframes translate-bar {
        0% {
          transform: translateX(-150%);
          filter: brightness(100%);
        }

        10% {
          animation-timing-function: cubic-bezier(0.5, 0, 0.7, 0.45);
          transform: translateX(-150%);
          filter: brightness(150%);
        }

        50% {
          animation-timing-function: cubic-bezier(0.3, 0.4, 0.5, 0.9);
          transform: translateX(-61%);
          filter: brightness(330%);
        }

        100% {
          transform: translateX(100%);
          filter: brightness(100%);
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  hidden = false;

  render() {
    return html` <div id="bar1"></div>`;
  }
}
