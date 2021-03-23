import { UUIEvent } from '../../../event/UUIEvent';
import { UUITextFieldElement } from './uui-textfield.element';

export class UUITextFieldEvent extends UUIEvent<{}, UUITextFieldElement> {
  public static readonly CHANGE: string = 'change';
}
