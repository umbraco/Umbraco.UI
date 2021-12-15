import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

export class UUIIconRegistryEvent extends UUIEvent<{ iconName: string }> {
  public static readonly ICON_REQUEST = 'icon_request';

  public acceptRequest() {
    this.preventDefault();
  }
}
