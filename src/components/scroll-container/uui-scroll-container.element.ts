import { defineElement } from '../../internal/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-scroll-container
 *  @slot - for content
 *  @attribute enforce-scroll - forces the scrollbar to appear
 *  @description - Component for displaying a larger amount of .
 *
 */
@defineElement('uui-scroll-container')
export class UUIScrollContainerElement extends LitElement {
  /**
   * @type {boolean}
   * @attr forces the scrollbar to appear
   */
  @property({ type: Boolean, reflect: true, attribute: 'enforce-scroll' })
  enforceScroll = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        display: block;
        overflow-y: auto;
        overflow-y: overlay;
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        transition: scrollbar-color 120ms 640ms;
      }

      :host([enforce-scroll]) {
        overflow-y: scroll;
      }
      :host([enforce-scroll]),
      :host(:hover),
      :host(:focus),
      :host(:focus-within) {
        scrollbar-color: var(--uui-color-disabled-contrast) transparent;
        transition: scrollbar-color 60ms;
      }

      :host::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      :host::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 3px;
      }

      :host::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 3px;
      }

      :host([enforce-scroll])::-webkit-scrollbar-thumb,
      :host(:hover)::-webkit-scrollbar-thumb,
      :host(:focus)::-webkit-scrollbar-thumb,
      :host(:focus-within)::-webkit-scrollbar-thumb {
        background-color: var(--uui-color-disabled-contrast);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-scroll-container': UUIScrollContainerElement;
  }
}
