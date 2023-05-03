import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

export class UUIIconRequestEvent extends UUIEvent<{ iconName: string }> {
  public static readonly ICON_REQUEST = 'icon_request';

  public icon: Promise<string> | null = null;

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true, composed: true },
      ...eventInit,
    });
  }

  public acceptRequest(icon: Promise<string>) {
    this.icon = icon;
    this.stopImmediatePropagation();
  }
}
