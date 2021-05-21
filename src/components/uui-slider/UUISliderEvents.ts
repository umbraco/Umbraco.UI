import { UUIEvent } from '../../event/UUIEvent';
import { UUISliderElement } from './uui-slider.element';

export class UUISliderEvent extends UUIEvent<{}, UUISliderElement> {
  public static readonly INPUT = 'input';
}
