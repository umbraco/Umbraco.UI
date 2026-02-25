import { UUIEvent } from '../../internal/events';
import type { UUIRefElement } from './ref.element';

export class UUIRefEvent extends UUIEvent<{}, UUIRefElement> {
  public static readonly OPEN = 'open';
}
