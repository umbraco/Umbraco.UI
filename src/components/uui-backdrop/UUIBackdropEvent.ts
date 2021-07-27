import { UUIEvent } from '../../event/UUIEvent';
import { UUIBackdropElement } from './uui-backdrop.element';

export class UUIBackdropEvent extends UUIEvent<{}, UUIBackdropElement> {
  public static readonly HIDDEN = 'hidden';
}
