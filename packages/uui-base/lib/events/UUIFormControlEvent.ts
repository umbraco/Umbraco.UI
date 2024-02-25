import { UUIFormControlMixinInterface } from '../mixins';
import { UUIEvent } from './UUIEvent';

export class UUIFormControlEvent extends UUIEvent<
  {},
  UUIFormControlMixinInterface
> {
  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }

  public static readonly VALID = 'valid';
  public static readonly INVALID = 'invalid';
}
