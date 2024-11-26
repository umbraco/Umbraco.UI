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
      if (oldVal === newVal) return;
      this._selectable = newVal;

      // Potentially problematic as a component might need focus for another feature when not selectable:
      //if (this.#selectableTarget === this) {
      // If the selectable target, then make it self selectable. (A different selectable target should be made focusable by the component itself)
      this.#selectableTarget.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
      //}
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

    #selectableTarget: Element = this;
    protected get selectableTarget(): EventTarget {
      return this.#selectableTarget;
    }
    protected set selectableTarget(target: EventTarget) {
      const oldTarget = this.#selectableTarget;

      oldTarget.removeAttribute('tabindex');
      oldTarget.removeEventListener('click', this.#onClick);
      oldTarget.removeEventListener(
        'keydown',
        this.#onKeydown as EventListener,
      );

      this.#selectableTarget = target as Element;
      this.#selectableTarget.setAttribute(
        'tabindex',
        this._selectable ? '0' : '-1',
      );
      target.addEventListener('click', this.#onClick);
      target.addEventListener('keydown', this.#onKeydown as EventListener);
    }

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('click', this.#onClick);
      this.addEventListener('keydown', this.#onKeydown);
    }

    readonly #onKeydown = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'Enter') return;
      this.#onClick(e);
    };

    readonly #onClick = (e: Event) => {
      const isSelectable =
        this._selectable || (this.deselectable && this.selected);

      if (isSelectable === false) return;

      if (this.#selectableTarget === this) {
        // If target is this, then only allow selection if the click is on the element itself.
        if (e.composedPath().indexOf(this.#selectableTarget) === 0) {
          if (e.type === 'keydown') {
            e.preventDefault(); // Do not want the space key to trigger a page scroll.
          }
          this.#toggleSelect();
        }
      } else if (e.composedPath().indexOf(this.#selectableTarget) !== -1) {
        if (e.type === 'keydown') {
          e.preventDefault(); // Do not want the space key to trigger a page scroll.
        }
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
