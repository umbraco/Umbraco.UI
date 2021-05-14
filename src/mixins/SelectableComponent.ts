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
    @property({ type: Boolean, reflect: true })
    public selectable = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;
  }
  return (SelectableMixinClass as unknown) as Constructor<
    SelectableMixinInterface
  > &
    T;
};
