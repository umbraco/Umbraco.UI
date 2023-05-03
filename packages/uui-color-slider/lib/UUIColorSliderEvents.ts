import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIColorSliderElement } from './uui-color-slider.element';

export class UUIColorSliderEvent extends UUIEvent<{}, UUIColorSliderElement> {
  public static readonly CHANGE = 'change';
}
