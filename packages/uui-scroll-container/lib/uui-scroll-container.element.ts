import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
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
        scrollbar-width: thin;
        scrollbar-color: var(--uui-color-disabled-contrast)
          var(--uui-color-surface);
        overflow-y: auto;
      }

      :host([enforce-scroll]) {
        overflow-y: scroll;
      }

      :host::-webkit-scrollbar {
        width: 6px;
        height: 6px; /* needed for horizontal scrollbar */
      }

      :host::-webkit-scrollbar-track {
        background: var(--uui-color-surface);
        border-radius: 3px;
      }
      :host::-webkit-scrollbar-thumb {
        background-color: var(--uui-color-disabled-contrast);
        border-radius: 3px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-scroll-container': UUIScrollContainerElement;
  }
}
