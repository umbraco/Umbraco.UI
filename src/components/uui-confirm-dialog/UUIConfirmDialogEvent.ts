import { UUIEvent } from '../../event/UUIEvent';
import { UUIConfirmDialogElement } from './uui-confirm-dialog.element';

export class UUIConfirmDialogEvent extends UUIEvent<
  {},
  UUIConfirmDialogElement
> {
  public static readonly SUBMIT = 'submit';
  public static readonly CANCEL = 'cancel';
}
