import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUITextareaElement } from './uui-textarea.element';

export class UUITextareaEvent extends UUIEvent<{}, UUITextareaElement> {
  public static readonly CHANGE: string = 'change';
}
