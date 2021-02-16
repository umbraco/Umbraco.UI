import { UUIEvent } from '../../../event/UUIEvent';

export class UUIConfirmDialogEvent extends UUIEvent {
  public static readonly SUBMIT = 'submit';
  public static readonly CANCEL = 'cancel';
}
