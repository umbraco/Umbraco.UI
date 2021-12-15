import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIButtonInlineCreateElement } from './uui-button-inline-create.element';

export class UUIButtonInlineCreateEvent extends UUIEvent<
  {},
  UUIButtonInlineCreateElement
> {
  public static readonly CLICK: string = 'click';
}
