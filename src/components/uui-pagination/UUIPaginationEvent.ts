import { UUIEvent } from '@umbraco-ui/uui-base/events';
import { UUIPaginationElement } from './uui-pagination.element';

export class UUIPaginationEvent extends UUIEvent<{}, UUIPaginationElement> {
  public static readonly CHANGE = 'change';
}
