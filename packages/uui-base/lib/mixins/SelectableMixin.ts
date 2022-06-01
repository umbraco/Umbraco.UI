import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUISelectableEvent } from '../events/UUISelectableEvent';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class SelectableMixinInterface extends LitElement {
  selectable: boolean;
  unselectable: boolean;
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
  superClass: T
) => {
  /**
   * @fires {UUISelectableEvent} selected - fires when the media card is selected
   * @fires {UUISelectableEvent} unselected - fires when the media card is unselected
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
      this.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
      this.requestUpdate('selected', oldVal);
    }

    protected unselectable = true;

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
      this.addEventListener('keydown', this.handleSelectKeydown);
    }

    private handleSelectKeydown(e: KeyboardEvent) {
      if (e.composedPath().indexOf(this.selectableTarget) !== -1) {
        if (e.key !== ' ' && e.key !== 'Enter') return;
        e.preventDefault();
        this._toggleSelect();
      }
    }

    private _select() {
      if (!this.selectable) return;
      this.selected = true;
      this.dispatchEvent(new UUISelectableEvent(UUISelectableEvent.SELECTED));
    }

    private _unselect() {
      if (!this.unselectable) return;
      this.selected = false;
      this.dispatchEvent(new UUISelectableEvent(UUISelectableEvent.UNSELECTED));
    }

    private _handleClick(e: Event) {
      if (e.composedPath().indexOf(this.selectableTarget) !== -1) {
        this._toggleSelect();
      }
    }

    private _toggleSelect() {
      if (this.unselectable === false) {
        this._select();
      } else {
        this.selected ? this._unselect() : this._select();
      }
    }
  }
  // prettier-ignore
  return (SelectableMixinClass as unknown) as Constructor<SelectableMixinInterface> & T;
};
