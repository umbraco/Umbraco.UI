import { UUIEvent } from '@umbraco-ui/uui-base/events/UUIEvent';
import { UUIPaginationElement } from './uui-pagination.element';

export class UUIPaginationEvent extends UUIEvent<{}, UUIPaginationElement> {
  public static readonly CHANGE = 'change';
}
