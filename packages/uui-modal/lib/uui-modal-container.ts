import { LitElement, PropertyValueMap, css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIModalSidebarElement } from './uui-modal-sidebar.element';
import { UUIModalElement } from './uui-modal.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

@defineElement('uui-modal-container')
export class UUIModalContainerElement extends LitElement {
  @query('slot')
  modalSlot?: HTMLSlotElement;

  @state()
  private _modals?: Array<UUIModalElement>;

  @state()
  private _sidebars?: Array<UUIModalSidebarElement>;

  @property({ type: Number })
  sidebarGap = 64;

  @property({ type: Number })
  transitionDurationMS = 250;

  constructor() {
    super();
    this.addEventListener('uui-modal-close', this.#onCloseModalClose);
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.style.setProperty(
      '--uui-modal-transition-duration',
      this.transitionDurationMS + 'ms'
    );
  }

  #onSlotChange = () => {
    this._modals =
      (this.modalSlot
        ?.assignedElements({ flatten: true })
        .filter(
          el => el instanceof UUIModalElement
        ) as Array<UUIModalElement>) ?? [];

    this._modals.forEach(modal =>
      modal.addEventListener('uui-modal-close', this.#onCloseModalClose)
    );

    this._sidebars = this._modals.filter(
      el => el instanceof UUIModalSidebarElement
    ) as Array<UUIModalSidebarElement>;

    if (this._modals.length === 0) {
      this.removeAttribute('backdrop');
      return;
    }

    this.#updateModals();
    this.#updateSidebars();
  };

  #onCloseModalClose = (event: Event) => {
    event.stopImmediatePropagation();

    event.target?.removeEventListener(
      'uui-modal-close',
      this.#onCloseModalClose
    );
    if (!this._modals || this._modals.length <= 1) {
      this.removeAttribute('backdrop');
      return;
    }

    this.#updateModals();
    this.#updateSidebars();
  };

  #updateModals() {
    this.setAttribute('backdrop', '');

    const reverse =
      this._modals?.filter(modal => !modal.isClosing).reverse() ?? [];

    //set index to all modals, the one in front is 0
    reverse?.forEach((modal, index) => {
      modal.index = index;
      modal.transitionDuration = this.transitionDurationMS;
    });

    //set unique-index on all modals based on which modal of the same type it is, the one in front is 0.
    reverse?.forEach(modal => {
      const sameType = reverse?.filter(
        m => m.constructor.name === modal.constructor.name
      );

      modal.uniqueIndex = sameType?.indexOf(modal) ?? 0;
    });
  }

  #updateSidebars() {
    requestAnimationFrame(() => {
      let sidebarOffset = 0;
      const reversed =
        this._sidebars?.filter(modal => !modal.isClosing).reverse() ?? [];

      for (let i = 0; i < reversed.length; i++) {
        const sidebar = reversed[i];
        const nextSidebar = reversed[i + 1];
        sidebar.style.setProperty('--uui-modal-offset', sidebarOffset + 'px');

        // Stop the calculations if the next sidebar is hidden
        if (nextSidebar?.hasAttribute('hide')) break;

        //TODO: is there a better way to get the width of the sidebar?
        const currentWidth =
          sidebar.shadowRoot?.querySelector('dialog')?.getBoundingClientRect()
            .width ?? 0;

        //TODO: is there a better way to get the width of the sidebar?
        const nextWidth =
          nextSidebar?.shadowRoot
            ?.querySelector('dialog')
            ?.getBoundingClientRect().width ?? 0;
        const distance =
          currentWidth + sidebarOffset + this.sidebarGap - nextWidth;
        sidebarOffset = distance > 0 ? distance : 0;
      }
    });
  }

  render() {
    return html`<slot @slotchange=${this.#onSlotChange}></slot>`;
  }
  static styles = css`
    :host {
      position: fixed;
      --uui-modal-color-backdrop: rgba(0, 0, 0, 0.5);
    }
    :host::after {
      content: '';
      position: fixed;
      inset: 0;
      background-color: var(--uui-modal-color-backdrop, rgba(0, 0, 0, 0.5));
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--uui-modal-transition-duration, 250ms);
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
