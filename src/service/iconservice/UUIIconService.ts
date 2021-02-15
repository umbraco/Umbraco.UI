import { UUIIconHost } from './UUIIconHost';
import { UUIVirtualEventEmitter } from '../../event/UUIVirtualEventEmitter';
import { UUIIconServiceEvent } from './UUIIconServiceEvent';

class UUIIconServiceClass extends UUIVirtualEventEmitter {
  private icons: Record<string, UUIIconHost> = {};

  public defineIcon(iconName: string, svgString: string) {
    if (this.icons[iconName]) {
      this.icons[iconName].svg = svgString;
    }
    this.icons[iconName] = new UUIIconHost(svgString);
  }

  public getIcon(iconName: string): Promise<string> {
    if (this.icons[iconName]) {
      return this.icons[iconName].promise;
    } else {
      const icon = new UUIIconHost();
      this.icons[iconName] = icon;

      this.emit(
        new UUIIconServiceEvent(UUIIconServiceEvent.ICON_REQUEST, iconName)
      );

      return icon.promise;
    }
  }
}

export const UUIIconService = new UUIIconServiceClass();
