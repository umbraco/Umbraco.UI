import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICustomSelectElement } from './uui-custom-select.element';

export class UUICustomSelectEvent extends UUIEvent<{}, UUICustomSelectElement> {
  public static readonly CHANGE = 'change';
  public static readonly INPUT = 'input';
}
