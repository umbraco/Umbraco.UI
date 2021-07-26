import { UUIEvent } from '../../event/UUIEvent';
import { UUILayerElement } from './uui-layer.element';

export class UUILayerEvent extends UUIEvent<{}, UUILayerElement> {
  public static readonly CLOSE = 'close';
  public static readonly CLOSED = 'closed';
}
