import { UUIEvent } from '../../event/UUIEvent';
import { UUIPaginationElement } from './uui-pagitantion.element';

export class UUIPaginationEvent extends UUIEvent<{}, UUIPaginationElement> {
  public static readonly CHANGE = 'change';
}
