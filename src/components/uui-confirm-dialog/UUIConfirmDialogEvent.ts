import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIConfirmDialogElement } from './uui-confirm-dialog.element';

export class UUIConfirmDialogEvent extends UUIEvent<
  {},
  UUIConfirmDialogElement
> {
  public static readonly SUBMIT = 'submit';
  public static readonly CANCEL = 'cancel';
}
