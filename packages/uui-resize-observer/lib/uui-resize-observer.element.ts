import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

import { UUIResizeEvent } from './UUIResizeEvent';

/**
 * @element uui-resize-observer
 */
@defineElement('uui-resize-observer')
export class UUIResizeObserverElement extends LitElement {
      static styles = [
    css`
      :host {
        display: contents;
      }
    `,
  ];

  private _resizeObserver!: ResizeObserver;
  private _observedElements: HTMLElement[] = [];

  /** Disables the observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.dispatchEvent(new UUIResizeEvent(UUIResizeEvent.CHANGE));
    });

    if (!this.disabled) {
      this.startObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }

  private handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }

  private startObserver() {
    const slot = this.shadowRoot!.querySelector('slot');

    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true }) as HTMLElement[];

      // Unwatch previous elements
      this._observedElements.forEach(el => this._resizeObserver.unobserve(el));
      this._observedElements = [];

      // Watch new elements
      elements.forEach(el => {
        this._resizeObserver.observe(el);
        this._observedElements.push(el);
      });
    }
  }

  private stopObserver() {
    this._resizeObserver.disconnect();
  }

  firstUpdated() {
    this.handleDisabledChange();
  }
  
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-resize-observer': UUIResizeObserverElement ;
  }
}
