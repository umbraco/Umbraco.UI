import { UUIEvent } from '../events/UUIEvent';
import { UUIBooleanInputBaseElement } from './uui-boolean-input-base.element';

export class UUIBooleanInputEvent extends UUIEvent<
  {},
  UUIBooleanInputBaseElement
> {
  public static readonly CHANGE: string = 'change';
}
