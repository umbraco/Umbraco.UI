import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { UUISelectableEvent } from '../events/UUISelectableEvent';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class SelectableMixinInterface extends LitElement {
  selectable: boolean;
  selected: boolean;
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

    /**
     * Attribute applied when the element is selected.
     * @attr
     * @type boolean
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('click', this._toggleSelect);
    }

    private _toggleSelect() {
      if (this.selectable === false) return;
      this.selected = !this.selected;

      this.dispatchEvent(
        new UUISelectableEvent(
          this.selected
            ? UUISelectableEvent.SELECTED
            : UUISelectableEvent.UNSELECTED,
          this
        )
      );
    }
  }
  // prettier-ignore
  return (SelectableMixinClass as unknown) as Constructor<SelectableMixinInterface> & T;
};
