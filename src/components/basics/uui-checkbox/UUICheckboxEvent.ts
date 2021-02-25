import { UUIEvent } from '../../../event/UUIEvent';
import { UUICheckboxElement } from './uui-checkbox.element';

export class UUICheckboxEvent extends UUIEvent<{}, UUICheckboxElement> {
  public static readonly CHANGE: string = 'change';
}
