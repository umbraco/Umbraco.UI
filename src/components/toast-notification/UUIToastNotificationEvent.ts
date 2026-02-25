import { UUIEvent } from '../../internal/events';

import { UUIToastNotificationElement } from './toast-notification.element';

export class UUIToastNotificationEvent extends UUIEvent<
  {},
  UUIToastNotificationElement
> {
  public static readonly OPENING = 'opening';
  public static readonly OPENED = 'opened';
  public static readonly CLOSING = 'closing';
  public static readonly CLOSED = 'closed';
}
