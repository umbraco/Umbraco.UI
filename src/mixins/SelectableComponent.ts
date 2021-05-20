import { LitElement } from 'lit';
import { property } from 'lit/decorators';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class SelectableMixinInterface {
  selectable: boolean;
  selected: boolean;
}

export const SelectableMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class SelectableMixinClass extends superClass {
    private _selectable = false;
    @property({ type: Boolean, reflect: true })
    get selectable() {
      return this._selectable;
    }

    set selectable(newVal) {
      const oldVal = this._selectable;
      this._selectable = newVal;
      this.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
      this.requestUpdate('selected', oldVal);
    }

    @property({ type: Boolean, reflect: true })
    public selected = false;
  }
  // prettier-ignore
  return (SelectableMixinClass as unknown) as Constructor<SelectableMixinInterface> & T;
};
