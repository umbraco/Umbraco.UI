import { UUIEvent } from '@umbraco-ui/uui-base/events';
import { UUIInputElement } from './uui-input.element';

export class UUIInputEvent extends UUIEvent<{}, UUIInputElement> {
  public static readonly CHANGE: string = 'change';
}
