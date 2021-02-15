import { UUIVirtualEvent } from '../../event/UUIVirtualEvent';

export class UUIIconServiceEvent extends UUIVirtualEvent {
  public static readonly ICONREQUEST: 'icon_request' = 'icon_request';

  public readonly iconName!: string;

  constructor(type: string, iconName: string) {
    super(type);
    this.iconName = iconName;
  }
}
