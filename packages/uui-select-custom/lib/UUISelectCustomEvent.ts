import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUISelectCustomElement } from './uui-select-custom.element';

export class UUISelectCustomEvent extends UUIEvent<UUISelectCustomElement> {
  public static readonly INPUT: string = 'input';
}
