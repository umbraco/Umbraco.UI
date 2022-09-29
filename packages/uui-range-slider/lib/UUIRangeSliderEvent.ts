import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIRangeSliderElement } from './uui-range-slider.element';

export class UUIRangeSliderEvent extends UUIEvent<{}, UUIRangeSliderElement> {
  public static readonly INPUT = 'input';
  public static readonly CHANGE = 'change';
}
