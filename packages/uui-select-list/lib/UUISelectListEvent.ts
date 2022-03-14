import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUISelectListElement } from './uui-select-list.element';

export class UUISelectListEvent extends UUIEvent<
  { selected: Element[] },
  UUISelectListElement
> {
  public static readonly CHANGE: string = 'change';
}
