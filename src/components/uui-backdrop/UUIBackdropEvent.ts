import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIBackdropElement } from './uui-backdrop.element';

export class UUIBackdropEvent extends UUIEvent<{}, UUIBackdropElement> {
  public static readonly HIDDEN = 'hidden';
}
