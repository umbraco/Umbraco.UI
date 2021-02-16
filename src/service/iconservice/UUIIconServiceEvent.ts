import { UUIEvent } from '../../event/UUIEvent';

export class UUIIconServiceEvent extends UUIEvent<{ iconName: string }> {
  public static readonly ICON_REQUEST = 'icon_request';
}
