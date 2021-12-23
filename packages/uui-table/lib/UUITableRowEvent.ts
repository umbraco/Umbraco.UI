import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUITableRowElement } from './uui-table-row.element';

export class UUITableRowEvent extends UUIEvent<{}, UUITableRowElement> {
  public static readonly SELECTED = 'selected';
  public static readonly UNSELECTED = 'unselected';
}
