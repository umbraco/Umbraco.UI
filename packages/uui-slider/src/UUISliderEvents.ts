import { UUIEvent } from '@umbraco-ui/uui-base/events';
import { UUISliderElement } from './uui-slider.element';

export class UUISliderEvent extends UUIEvent<{}, UUISliderElement> {
  public static readonly INPUT = 'input';
}
