import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIToastNotificationElement } from './uui-toast-notification.element';

export class UUIToastNotificationEvent extends UUIEvent<
  {},
  UUIToastNotificationElement
> {
  public static readonly OPENING = 'opening';
  public static readonly CLOSING = 'closing';
  public static readonly CLOSED = 'closed';
}
