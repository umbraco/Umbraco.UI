import { UUIEvent } from '../../../event/UUIEvent';
import { UUIRadioElement } from './uui-radio.element';

export class UUIRadioEvent extends UUIEvent<{}, UUIRadioElement> {
  public static readonly CHANGE = 'change';
}
