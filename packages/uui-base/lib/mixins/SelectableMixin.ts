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
      if (!this.selectableTarget) {
        // If not selectable target, then make it self selectable. (A selectable target should be made focusable by the component itself)
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
      this.addEventListener('click', this._handleClick);
      this.addEventListener('keydown', this._handleSelectKeydown);
    }

    private _handleClick(e: Event) {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (e.composedPath().indexOf(this.selectableTarget) !== -1) {
        this._toggleSelect();
      }
    }

    private _handleSelectKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (this.selectableTarget === this) {
        if (e.key !== ' ' && e.key !== 'Enter') return;
        this._toggleSelect();
      }
    };

    private _select() {
      if (!this.selectable) return;
      const selectEvent = new UUISelectableEvent(UUISelectableEvent.SELECTED);
      this.dispatchEvent(selectEvent);
      if (selectEvent.defaultPrevented) return;

      this.selected = true;
    }

    private _deselect() {
      if (!this.deselectable) return;
      const selectEvent = new UUISelectableEvent(UUISelectableEvent.DESELECTED);
      this.dispatchEvent(selectEvent);
      if (selectEvent.defaultPrevented) return;

      this.selected = false;
    }

    private _toggleSelect() {
      // Only allow for select-interaction if selectable is true. Deselectable is ignorered in this case, we do not want a DX where only deselection is a possibility.
      if (!this.selectable) return;
      if (this.deselectable === false) {
        this._select();
      } else {
        this.selected ? this._deselect() : this._select();
      }
    }
  }
  // prettier-ignore
  return (SelectableMixinClass as unknown) as Constructor<SelectableMixinInterface> & T;
};
