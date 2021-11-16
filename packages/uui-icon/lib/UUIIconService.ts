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

  public async getIcon(iconName: string): Promise<string> {
    if (this.icons[iconName]) {
      return this.icons[iconName].promise;
    } else {
      const icon = new UUIIconHost();
      this.icons[iconName] = icon;

      const event = new UUIIconServiceEvent(UUIIconServiceEvent.ICON_REQUEST, {
        cancelable: true,
        detail: { iconName },
      });
      this.dispatchEvent(event);

      if(event.defaultPrevented === false) {
        // as no one prevented default we will reject, to show fallback.
        console.log("reject")
        icon.reject();
      }

      return icon.promise;
    }
  }
}

export const UUIIconService = new UUIIconServiceClass();
