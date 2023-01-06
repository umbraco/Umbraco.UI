import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIColorAreaElement } from './uui-color-area.element';

export class UUIColorAreaEvent extends UUIEvent<{}, UUIColorAreaElement> {
  public static readonly CHANGE = 'change';
}
