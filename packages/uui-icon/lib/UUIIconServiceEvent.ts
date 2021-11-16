import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

export class UUIIconServiceEvent extends UUIEvent<{ iconName: string }> {
  public static readonly ICON_REQUEST = 'icon_request';
}
