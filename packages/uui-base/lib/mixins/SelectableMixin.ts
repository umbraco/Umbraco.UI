import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUISelectableEvent } from '../events/UUISelectableEvent';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class SelectableMixinInterface extends LitElement {
  /**
   * Enable the ability to select this element.
   * @attr
   * @prop
   * @type boolean
   */
  selectable: boolean;
  deselectable: boolean;

  /**
   * Attribute applied when the element is selected.
   * @attr
   * @prop
   * @type boolean
   */
  selected: boolean;
  selectableTarget: EventTarget;
}

/**
 * This mixin provides select functionality.
 * Consider if it makes sense to use the SelectOnlyMixin as well.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const SelectableMixin = <T extends Constructor<LitElement>>(
  superClass: T,
) => {
  /**
   * @fires {UUISelectableEvent} selected - fires when the media card is selected
   * @fires {UUISelectableEvent} deselected - fires when the media card is deselected
   */
  class SelectableMixinClass extends superClass {
    private _selectable = false;
    /**
     * Enable the ability to select this element.
     * @attr
     * @type boolean
     */
    @property({ type: Boolean, reflect: true })
    get selectable() {
      return this._selectable;
    }
    set selectable(newVal) {
      const oldVal = this._selectable;
      this._selectable = newVal;
      // Potentially problematic as a component might need focus for another feature when not selectable:
      if (this.selectableTarget === this) {
        // If the selectable target, then make it self selectable. (A different selectable target should be made focusable by the component itself)
        this.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
      }
      this.requestUpdate('selectable', oldVal);
    }

    protected deselectable = true;

    /**
     * Attribute applied when the element is selected.
     * @attr
     * @type boolean
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    protected selectableTarget: EventTarget = this;

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('click', this.#onClick);
      this.addEventListener('keydown', this.#onKeydown);
    }

    readonly #onKeydown = (e: KeyboardEvent) => {
      const composePath = e.composedPath();
      if (
        (this._selectable || (this.deselectable && this.selected)) &&
        composePath.indexOf(this.selectableTarget) === 0
      ) {
        if (this.selectableTarget === this) {
          if (e.code !== 'Space' && e.code !== 'Enter') return;
          this.#toggleSelect();
          e.preventDefault();
        }
      }
    };

    readonly #onClick = (e: Event) => {
      const composePath = e.composedPath();
      const isActionTag = composePath.some(el => {
        const element = el as HTMLElement;
        return element.tagName === 'A' || element.tagName === 'BUTTON';
      });

      // never select when clicking on a link or button
      if (isActionTag) return;

      const isSelectable =
        this._selectable || (this.deselectable && this.selected);

      if (isSelectable && this.selectableTarget === this) {
        this.#toggleSelect();
        return;
      }

      if (isSelectable && composePath.indexOf(this.selectableTarget) === 0) {
        this.#toggleSelect();
      }
    };

    #toggleSelect() {
      // Only allow for select-interaction if selectable is true. Deselectable is ignored in this case, we do not want a DX where only deselection is a possibility..
      if (!this.selectable) return;
      if (this.deselectable === false) {
        this.#select();
      } else {
        this.selected ? this.#deselect() : this.#select();
      }
    }

    #select() {
      if (!this.selectable) return;
      const selectEvent = new UUISelectableEvent(UUISelectableEvent.SELECTED);
      this.dispatchEvent(selectEvent);
      if (selectEvent.defaultPrevented) return;

      this.selected = true;
    }

    #deselect() {
      if (!this.deselectable) return;
      const selectEvent = new UUISelectableEvent(UUISelectableEvent.DESELECTED);
      this.dispatchEvent(selectEvent);
      if (selectEvent.defaultPrevented) return;

      this.selected = false;
    }
  }
  // prettier-ignore
  return (SelectableMixinClass as unknown) as Constructor<SelectableMixinInterface> & T;
};
