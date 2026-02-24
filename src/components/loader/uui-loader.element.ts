import { LitElement, html, css } from 'lit';
import { defineElement } from '../../internal/registration';

/**
 *  A basic loader.
 *  @element uui-loader
 */
@defineElement('uui-loader')
export class UUILoaderElement extends LitElement {
  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
    `;
  }

  static styles = [
    css`
      :host {
        color: var(--uui-color-default);
      }

      div {
        display: inline-block;
        width: var(--uui-size-2);
        height: var(--uui-size-2);
        border: 1px solid currentColor;
        border-radius: 100%;
        animation: loaderAnimation 1.2s infinite;
        transition:
          transform 60ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          background-color 60ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
        }
        50% {
          transform: scale(1);
          background-color: transparent;
        }
        100% {
          transform: scale(0.33);
          background-color: currentColor;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader': UUILoaderElement;
  }
}
