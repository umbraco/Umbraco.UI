import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { findAncestorByAttributeValue } from '../utils';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class UUIPopoverTargetMixinInterface {
  /**
   * Set a popovertarget.
   * @type {string}
   * @attr
   * @default undefined
   */
  public popoverContainerElement?: string;

  /**
   * Toggle the popover.
   */
  protected _togglePopover(): void;
}

/**
 * This mixin provides popover target functionality to other components.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const PopoverTargetMixin = <T extends Constructor<LitElement>>(
  superClass: T,
) => {
  /**
   * Popover target mixin class containing the popover target functionality.
   */
  class UUIPopoverTargetMixinClass extends superClass {
    /**
     * Set a popovertarget.
     * @type {string}
     * @attr
     * @default undefined
     */
    @property({ type: String, attribute: 'popovertarget' })
    public popoverContainerElement?: string;

    #popoverIsOpen = false;

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('uui-popover-before-toggle', this.#popoverListener);
    }

    protected _togglePopover = () => {
      if (!this.popoverContainerElement) return;

      const popoverContainerElement = findAncestorByAttributeValue(
        this,
        'id',
        this.popoverContainerElement,
      );
      if (!popoverContainerElement) return;

      if (this.#popoverIsOpen) {
        // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
        popoverContainerElement.hidePopover();
      } else {
        // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
        popoverContainerElement.showPopover();
      }
    };

    #popoverListener = (event: any) => {
      // Wait for the click event to finish before updating the popover state
      requestAnimationFrame(() => {
        this.#popoverIsOpen = event.detail.newState === 'open';
      });
    };
  }
  return UUIPopoverTargetMixinClass as unknown as Constructor<UUIPopoverTargetMixinInterface> &
    T;
};

/** @deprecated Use UUIPopoverTargetMixinInterface instead */
export type PopoverTargetMixinInterface = UUIPopoverTargetMixinInterface;
