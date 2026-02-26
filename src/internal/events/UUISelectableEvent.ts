import type { UUISelectableMixinInterface } from '../mixins/index.js';
import { UUIEvent } from './UUIEvent.js';

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
