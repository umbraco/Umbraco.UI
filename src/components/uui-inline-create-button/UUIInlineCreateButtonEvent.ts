import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIInlineCreateButtonElement } from './uui-inline-create-button.element';

export class UUIInlineCreateButtonEvent extends UUIEvent<
  {},
  UUIInlineCreateButtonElement
> {
  public static readonly CLICK: string = 'click';
}
