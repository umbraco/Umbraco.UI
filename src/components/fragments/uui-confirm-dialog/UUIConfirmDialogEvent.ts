import { UUIEvent } from '../../../event/UUIEvent';

export class UUIConfirmDialogEvent extends UUIEvent {
  public static readonly CONFIRM = 'confirm';
  public static readonly CANCEL = 'cancel';
}
