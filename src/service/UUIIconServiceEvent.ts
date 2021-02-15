import { UUIVirtualEvent } from '../event/UUIVirtualEvent';

export class UUIIconServiceEvent extends UUIVirtualEvent {
  public static ICONREQUEST: Readonly<'icon_request'> = 'icon_request';

  public iconName!: Readonly<string>;

  constructor(type: string, iconName: string) {
    super(type);
    this.iconName = iconName;
  }
}
