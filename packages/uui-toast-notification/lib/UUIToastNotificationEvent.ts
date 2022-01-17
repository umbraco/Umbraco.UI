import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIToastNotificationElement } from './uui-toast-notification.element';

export class UUIToastNotificationEvent extends UUIEvent<
  {},
  UUIToastNotificationElement
> {
  public static readonly OPEN = 'open';
  public static readonly CLOSE = 'close';
  public static readonly CLOSED = 'closed';
}
