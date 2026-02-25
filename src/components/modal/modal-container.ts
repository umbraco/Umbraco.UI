import { LitElement, PropertyValueMap, css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { UUIModalSidebarElement } from './modal-sidebar.element';
import { UUIModalCloseEvent, UUIModalElement } from './modal.element';
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
    this.addEventListener(UUIModalCloseEvent, this.#onCloseModalClose);
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    this.style.setProperty(
      '--uui-modal-transition-duration',
      this.transitionDurationMS + 'ms',
    );
  }

  #onSlotChange = () => {
    const existingModals = this._modals ?? [];

    this._modals =
      (this.modalSlot
        ?.assignedElements({ flatten: true })
        .filter(
          el => el instanceof UUIModalElement,
        ) as Array<UUIModalElement>) ?? [];

    const oldModals = existingModals.filter(
      modal => this._modals!.indexOf(modal) === -1,
    );
    oldModals.forEach(modal =>
      modal.removeEventListener(UUIModalCloseEvent, this.#onCloseModalClose),
    );

    const newModals = this._modals.filter(
      modal => existingModals.indexOf(modal) === -1,
    );
    newModals.forEach(modal =>
      modal.addEventListener(UUIModalCloseEvent, this.#onCloseModalClose),
    );

    this._sidebars = this._modals.filter(
      el => el instanceof UUIModalSidebarElement,
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
      UUIModalCloseEvent,
      this.#onCloseModalClose,
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
        m => m.constructor.name === modal.constructor.name,
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
        const tempSidebarOffset = sidebarOffset; // Cache to prevent it from being overwritten before the updateComplete.
        // The sidebar checks it's own width at sets it's --uui-modal-offset to negative that width.
        // This enables it to slide in from the right. So we need to set the new --uui-modal-offset after the updateComplete.
        sidebar.updateComplete.then(() => {
          sidebar.style.setProperty(
            '--uui-modal-offset',
            tempSidebarOffset + 'px',
          );
        });

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
