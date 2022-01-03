import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { SelectableMixinInterface } from '../mixins';

export class UUISelectableEvent extends UUIEvent<{}, SelectableMixinInterface> {
  public static readonly SELECTED = 'selected';
  public static readonly UNSELECTED = 'unselected';
}
