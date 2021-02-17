import { UUIEvent } from '../../../event/UUIEvent';
import { UUIToggleElement } from './uui-toggle.element';

export class UUIToggleEvent extends UUIEvent<{}, UUIToggleElement> {
  public static readonly CHANGE: string = 'change';
}
