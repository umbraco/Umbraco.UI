import { UUIEvent } from '../../internal/events/index.js';
import type { UUIRefElement } from './ref.element.js';

export class UUIRefEvent extends UUIEvent<{}, UUIRefElement> {
  public static readonly OPEN = 'open';
}
