import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-loader': UUILoaderElement;
  }
}
