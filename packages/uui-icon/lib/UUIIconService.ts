import { UUIIconHost } from './UUIIconHost';
import { UUIIconServiceEvent } from './UUIIconServiceEvent';

class UUIIconServiceClass extends EventTarget {
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

      this.dispatchEvent(
        new UUIIconServiceEvent(UUIIconServiceEvent.ICON_REQUEST, {
          detail: { iconName },
        })
      );

      return icon.promise;
    }
  }
}

export const UUIIconService = new UUIIconServiceClass();
