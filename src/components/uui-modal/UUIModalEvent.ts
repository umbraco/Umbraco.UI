import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIModalElement } from './uui-modal.element';

export class UUIModalEvent extends UUIEvent<{}, UUIModalElement> {
  public static readonly OPEN = 'open';
  public static readonly CLOSE = 'close';
  public static readonly CLOSED = 'closed';
}
