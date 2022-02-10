import { FormControlMixinInterface } from '../mixins';
import { UUIEvent } from './UUIEvent';

export class UUIFormControlEvent extends UUIEvent<
  {},
  FormControlMixinInterface
> {
  public static readonly VALID = 'valid';
  public static readonly INVALID = 'invalid';
}
