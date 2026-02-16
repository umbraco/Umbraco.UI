import { property } from 'lit/decorators.js';
import { UUISelectableMixinInterface } from './SelectableMixin';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class UUISelectOnlyMixinInterface extends UUISelectableMixinInterface {
  selectOnly: boolean;
}

/**
 * This mixin partly provides the select-only functionality.
 * Each component still need to implement its own code for disabling interaction when select only is active.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const SelectOnlyMixin = <
  T extends Constructor<UUISelectableMixinInterface>,
>(
  superClass: T,
) => {
  class UUISelectOnlyMixinClass extends superClass {
    private _selectOnly = false;

    /**
     * Enforce selection interaction and prevent all other interactions, set this when the UI is turned into Selection-Mode.
     * @attr
     * @type boolean
     */
    @property({ type: Boolean, reflect: true, attribute: 'select-only' })
    get selectOnly() {
      return this._selectOnly;
    }
    set selectOnly(newVal) {
      const oldVal = this._selectOnly;
      this._selectOnly = newVal;
      this.requestUpdate('selectOnly', oldVal);
    }
  }
  // prettier-ignore
  return (UUISelectOnlyMixinClass as unknown) as Constructor<UUISelectOnlyMixinInterface> & T;
};
