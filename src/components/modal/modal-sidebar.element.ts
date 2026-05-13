import type { PropertyValueMap } from 'lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIModalElement } from './modal.element.js';
export type UUIModalSidebarSize = 'small' | 'medium' | 'large' | 'full';

export class UUIModalSidebarElement extends UUIModalElement {
  /**
   * @attr
   */
  @property({ reflect: true })
  size: UUIModalSidebarSize = 'full';

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    super.updated(_changedProperties);

    // if we've reached over X layers of sidebars, hide for better performance.
    if (this.uniqueIndex > 10) {
      this.setAttribute('hide', '');
    } else {
      this.removeAttribute('hide');
    }
  }

  get #getWidth() {
    return this._popoverElement?.getBoundingClientRect().width ?? 0;
  }

  forceClose() {
    if (this.isClosing) return;

    this.isClosing = true;
    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');

    setTimeout(() => {
      super.forceClose();
    }, this.transitionDuration);
  }

  render() {
    return html`<div
      popover="manual"
      role="dialog"
      aria-modal="true"
      aria-label="Dialog">
      <slot></slot>
    </div>`;
  }

  static override readonly styles = [
    ...UUIModalElement.styles,
    css`
      :host {
        outline: none;
        --uui-modal-sidebar-left-gap: 24px;
        --uui-modal-sidebar-background: var(--uui-color-surface);
      }
      @media (min-width: 600px) {
        :host {
          --uui-modal-sidebar-left-gap: 64px;
        }
      }
      [popover] {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        max-width: calc(100% - var(--uui-modal-sidebar-left-gap));
        margin-left: auto;
        right: var(--uui-modal-offset);
        transition: right var(--uui-modal-transition-duration, 250ms);
        background: var(
          --uui-modal-sidebar-background,
          var(--uui-color-surface)
        );
      }
      :host([index='0']) [popover] {
        box-shadow: var(--uui-shadow-depth-5);
      }
      :host(:not([index='0'])) [popover] {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
      :host([hide]) [popover] {
        display: none;
      }
      :host([size='large']) [popover] {
        max-width: min(1200px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='medium']) [popover] {
        max-width: min(800px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='small']) [popover] {
        max-width: min(500px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
    `,
  ];
}
