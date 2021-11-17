import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIDialogConfirmElement } from './uui-dialog-confirm.element';

export class UUIDialogConfirmEvent extends UUIEvent<
  {},
  UUIDialogConfirmElement
> {
  public static readonly SUBMIT = 'submit';
  public static readonly CANCEL = 'cancel';
}
