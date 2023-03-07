import { LitElement, css, html } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';
import type { UUIModalDialogElement } from './uui-modal-dialog.element';
import './uui-modal-dialog.element.ts';
import type { UUIModalSidebarElement } from './uui-modal-sidebar.element';
import './uui-modal-sidebar.element.ts';
@customElement('uui-modal-container')
export class UUIModalContainerElement extends LitElement {
  @queryAssignedElements({
    selector:
      'uui-modal-dialog:not([closing]), uui-modal-sidebar:not([closing])',
    flatten: true,
  })
  private _modals?: Array<UUIModalDialogElement | UUIModalSidebarElement>;

  @queryAssignedElements({
    selector: 'uui-modal-sidebar:not([closing])',
    flatten: true,
  })
  private _sidebars?: Array<UUIModalSidebarElement>;

  #sidebarMargin = 64;

  constructor() {
    super();
    this.addEventListener('close', this.#onClose.bind(this));
  }

  #onSlotChange() {
    if (!this._modals || this._modals.length === 0) {
      this.removeAttribute('backdrop');
      return;
    }

    this.#updateModals();
    this.#updateSidebars();
  }

  #onClose() {
    if (!this._modals || this._modals.length === 0) {
      this.removeAttribute('backdrop');
      return;
    }

    this.#updateModals();
    this.#updateSidebars();
  }

  #updateModals() {
    this.setAttribute('backdrop', '');
    this._modals?.[this._modals.length - 1]?.setAttribute('front', '');
    this._modals?.[this._modals.length - 2]?.removeAttribute('front');
  }

  #updateSidebars() {
    requestAnimationFrame(() => {
      let sidebarOffset = 0;
      const reversed = this._sidebars?.reverse() ?? [];

      reversed.forEach((sidebar, index) => {
        sidebar.style.setProperty('--offset', sidebarOffset + 'px');
        //TODO: This can maybe be done an attribute on the host element instead.
        const currentWidth =
          sidebar.shadowRoot?.querySelector('dialog')?.getBoundingClientRect()
            .width ?? 0;

        //TODO: This can maybe be done an attribute on the host element instead.
        const nextWidth =
          reversed[index + 1]?.shadowRoot
            ?.querySelector('dialog')
            ?.getBoundingClientRect().width ?? 0;

        //Distance to the next sidebar on the x axis (negative means left)
        const distance =
          currentWidth + sidebarOffset + this.#sidebarMargin - nextWidth;

        sidebarOffset = distance > 0 ? distance : 0;
      });
    });
  }

  render() {
    return html`<slot @slotchange=${this.#onSlotChange}></slot>`;
  }
  static styles = css`
    :host {
      position: fixed;
      --color-backdrop: rgba(0, 0, 0, 0.5);
    }
    :host::after {
      content: '';
      position: fixed;
      inset: 0;
      background-color: var(--color-backdrop, rgba(0, 0, 0, 0.5));
      opacity: 0;
      pointer-events: none;
      transition: opacity 250ms;
    }
    :host([backdrop])::after {
      opacity: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container': UUIModalContainerElement;
  }
}
