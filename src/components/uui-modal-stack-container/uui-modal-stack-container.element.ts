import { css } from 'lit';
import { property } from 'lit/decorators';
import { UUIModalContainerElement } from '../uui-modal-container/uui-modal-container.element';
import { UUIModalElement } from '../uui-modal/uui-modal.element';

/**
 *  @element uui-modal-container
 *  @description - Modal container component, inject modals into this manager component.
 */
export class UUIModalStackContainerElement extends UUIModalContainerElement {
  static styles = [
    ...UUIModalContainerElement.styles,
    css`
      :host {
        overflow: hidden;
      }

      ::slotted(*:not(uui-backdrop)) {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        opacity: 1;
        transform: translateX(100%);
        transition: transform 480ms cubic-bezier(0.3, 0.7, 0.8, 1);
      }
      ::slotted(*:not(uui-backdrop)[modalvisible]) {
        transform: translateX(0);
      }
      ::slotted(*:not(uui-backdrop)[data-modal-shrink='1']) {
        left: 40px;
      }
      ::slotted(*:not(uui-backdrop)[data-modal-shrink='2']) {
        left: 80px;
      }
      ::slotted(*:not(uui-backdrop)[data-modal-shrink='3']) {
        left: 120px;
      }
      ::slotted(*:not(uui-backdrop)[data-modal-shrink='4']) {
        left: 160px;
      }
      ::slotted(*:not(uui-backdrop)[data-modal-push='1']) {
        transform: translateX(-40px);
      }
      ::slotted(*:not(uui-backdrop)[data-modal-push='2']) {
        transform: translateX(-80px);
      }
      ::slotted(*:not(uui-backdrop)[data-modal-push='3']) {
        transform: translateX(-120px);
      }
      ::slotted(*:not(uui-backdrop)[data-modal-push='4']) {
        transform: translateX(-160px);
      }
    `,
  ];

  @property({ type: Number })
  stackLength = 3;

  protected levelsUpdated(visibleModals: UUIModalElement[]) {
    const visibleModalsCount = visibleModals.length - 1;
    const modalsInStackCount = Math.min(visibleModalsCount, this.stackLength);
    for (let i = 0; i < this.modals.length; i++) {
      // Shrink number: 0,1,2,3,4 (first layer at 0, shrinks for each layer up til the amount of layers we show in the stack. When we dont shrink anymore we will start to push the layers.)
      this.modals[i].setAttribute(
        'data-modal-shrink',
        Math.min(i, this.stackLength).toString()
      );
      //
      //
      const below = Math.max(modalsInStackCount - i, 0);
      const offset = Math.max(visibleModalsCount - i, 0);
      this.modals[i].setAttribute(
        'data-modal-push',
        (Math.min(offset, this.stackLength) - below).toString()
      );
    }
  }
}
