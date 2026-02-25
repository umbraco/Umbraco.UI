import { UUIEvent } from '../../internal/events';
import { UUIRefElement } from './ref.element';

export class UUIRefEvent extends UUIEvent<{}, UUIRefElement> {
  public static readonly OPEN = 'open';
}
