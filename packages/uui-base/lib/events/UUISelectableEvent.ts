import { SelectableMixinInterface } from '../mixins';
import { UUIEvent } from './UUIEvent';

export class UUISelectableEvent extends UUIEvent<{}, SelectableMixinInterface> {
  public static readonly SELECTED = 'selected';
  public static readonly UNSELECTED = 'unselected';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
