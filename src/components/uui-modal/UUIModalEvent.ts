import { UUIEvent } from '../../event/UUIEvent';
import { UUIModalElement } from './uui-modal.element';

export class UUIModalEvent extends UUIEvent<{}, UUIModalElement> {
  public static readonly CLOSE = 'close';
  public static readonly CLOSED = 'closed';
}
