import { FormControlMixinInterface } from '../mixins';
import { UUIEvent } from './UUIEvent';

export class UUIFormControlEvent extends UUIEvent<
  {},
  FormControlMixinInterface
> {
  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true, composed: true },
      ...eventInit,
    });
  }

  public static readonly VALID = 'valid';
  public static readonly INVALID = 'invalid';
}
