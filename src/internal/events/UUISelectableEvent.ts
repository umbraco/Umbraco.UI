import { UUISelectableMixinInterface } from '../mixins';
import { UUIEvent } from './UUIEvent';

export class UUISelectableEvent extends UUIEvent<
  {},
  UUISelectableMixinInterface
> {
  public static readonly SELECTED = 'selected';
  public static readonly DESELECTED = 'deselected';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true, cancelable: true },
      ...eventInit,
    });
  }
}
