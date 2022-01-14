import { LitElement, html, css } from 'lit';
import { query } from 'lit/decorators';
import '../uui-backdrop/';
import { UUIBackdropElement } from '../uui-backdrop/uui-backdrop.element';
import { UUIBackdropEvent } from '../uui-backdrop/UUIBackdropEvent';
import { UUIModalElement } from '../uui-modal/uui-modal.element';
import { UUIModalEvent } from '../uui-modal/UUIModalEvent';

/**
 *  @element uui-modal-container
 *  @description - Modal container component, inject modals into this manager component.
 */
export class UUIModalContainerElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      slot {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      ::slotted(*:not(uui-backdrop)) {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        opacity: 0;
        transform: scale(90%);
        transition: transform 480ms cubic-bezier(0.3, 0.7, 0.8, 1),
          opacity 480ms;
      }
      ::slotted(*:not(uui-backdrop)[modalvisible]) {
        transform: none;
        opacity: 1;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  protected modals: UUIModalElement[] = [];

  private queryModals = () => {
    const existingModals = [...this.modals];

    this.modals = this.slotElement
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUIModalElement) as UUIModalElement[];

    const newModals = this.modals.filter(
      modal => existingModals.indexOf(modal) === -1
    );
    newModals.forEach(el => {
      el.addEventListener(
        UUIModalEvent.CLOSE,
        this.onModalClose as EventHandlerNonNull
      );
      el.addEventListener(
        UUIModalEvent.CLOSED,
        this.onModalClosed as EventHandlerNonNull
      );
      el.addEventListener(
        UUIModalEvent.OPEN,
        this.onModalOpen as EventHandlerNonNull
      );
      el.openModal();
    });

    if (newModals.length > 0 || existingModals.length !== this.modals.length) {
      this.updateBackdrop();
    }
  };

  private onModalOpen = (e: UUIModalEvent) => {
    this.updateBackdrop();
  };
  private onModalClose = (e: UUIModalEvent) => {
    this.updateBackdrop();
  };
  private onModalClosed = (e: UUIModalEvent) => {
    this.removeModal(e.target);
  };

  public addModal(modal: UUIModalElement) {
    this.slotElement.appendChild(modal);
  }
  public removeModal(modal?: UUIModalElement) {
    let _modal = modal;
    if (!_modal) {
      _modal = this.modals[this.modals.length - 1];
    } else if (this.modals.indexOf(_modal) === -1) {
      console.warn(
        'Modal',
        modal,
        'could not be removed as it is not a child of this modal-container',
        this
      );
      return;
    }
    _modal.removeEventListener(
      UUIModalEvent.CLOSE,
      this.onModalClose as EventHandlerNonNull
    );
    _modal.removeEventListener(
      UUIModalEvent.CLOSED,
      this.onModalClosed as EventHandlerNonNull
    );
    this.removeChild(_modal);
  }
  public closeModal(modal?: UUIModalElement) {
    let _modal = modal;
    if (!_modal) {
      _modal = this.modals[this.modals.length - 1];
    }
    _modal.closeModal();
  }

  private currentBackdrop: UUIBackdropElement | null = null;

  protected levelsUpdated(
    visibleModals: UUIModalElement[],
    frontModal: UUIModalElement | null
  ) {
    // extension point, not implemented in this class
  }

  private updateBackdrop() {
    // Find the top layer, thats visible and provide shadow for it.
    const visibleModals = this.modals.filter(el => el.modalVisible === true);
    const modalInFront =
      visibleModals.length > 0 ? visibleModals[visibleModals.length - 1] : null;

    if (this.currentBackdrop) {
      // We are suddenly in the front(happened if lever has been removed, not animated.), ups, we don't want that lets instead swap placement instantly.
      if (this.currentBackdrop.nextSibling === null) {
        if (modalInFront) {
          this.insertBefore(this.currentBackdrop, modalInFront);
        } else {
          this.removeChild(this.currentBackdrop);
          this.currentBackdrop.removeEventListener(
            UUIBackdropEvent.HIDDEN,
            this.onBackdropHidden as EventHandlerNonNull
          );
          this.currentBackdrop = null;
        }
        this.levelsUpdated(visibleModals, modalInFront);
        return;
      }

      // check position of current backdrop to ensure we need update..
      if (this.currentBackdrop.nextSibling === modalInFront) {
        return;
      }
      this.currentBackdrop.addEventListener(
        UUIBackdropEvent.HIDDEN,
        this.onBackdropHidden as EventHandlerNonNull
      );
      this.currentBackdrop.hide();
      this.currentBackdrop = null;
    }

    if (modalInFront) {
      this.currentBackdrop = document.createElement(
        'uui-backdrop'
      ) as UUIBackdropElement;
      this.insertBefore(this.currentBackdrop, modalInFront);
    }
    this.levelsUpdated(visibleModals, modalInFront);
  }

  private onBackdropHidden = (e: UUIBackdropEvent) => {
    e.target.removeEventListener(
      UUIBackdropEvent.HIDDEN,
      this.onBackdropHidden as EventHandlerNonNull
    );
    this.removeChild(e.target);
  };

  render() {
    return html` <slot part="slot" @slotchange=${this.queryModals}></slot> `;
  }
}
