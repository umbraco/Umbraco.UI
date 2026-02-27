import { UUIIconRequestEvent } from '../icon/UUIIconRequestEvent.js';

import { UUIIconHost } from './UUIIconHost.js';

export class UUIIconRegistry {
  private icons: Record<string, UUIIconHost> = {};

  /**
   * Attach an element to provide this registry. Use detach when disconnected.
   * @param {EventTarget} element the element of which to provide this icon-set.
   */
  public attach(element: EventTarget) {
    element.addEventListener(
      UUIIconRequestEvent.ICON_REQUEST,
      this._onIconRequest as EventListener,
    );
  }

  /**
   * Detach an element from providing this registry.
   * @param {EventTarget} element the element of which to stop providing this icon-set.
   */
  public detach(element: EventTarget) {
    element.removeEventListener(
      UUIIconRequestEvent.ICON_REQUEST,
      this._onIconRequest as EventListener,
    );
  }

  private _onIconRequest = (event: UUIIconRequestEvent) => {
    const icon = this.getIcon(event.detail.iconName);
    if (icon !== null) {
      event.acceptRequest(icon);
    }
  };

  /**
   * Define a icon to be served by this registry.
   * @param {string} iconName the name to use for this icon.
   * @param {string} svgString the svg source for this icon.
   */
  public defineIcon(iconName: string, svgString: string) {
    if (this.icons[iconName]) {
      this.icons[iconName].svg = svgString;
      return;
    }
    this.icons[iconName] = new UUIIconHost(svgString);
  }

  /**
   * Retrieve the SVG source of an icon, Returns ´null´ if the name does not exist.
   * @param {string} iconName the name of the icon to retrieve.
   */
  public getIcon(iconName: string): Promise<string> | null {
    if (!!this.icons[iconName] || this.acceptIcon(iconName)) {
      return this.icons[iconName].promise;
    }
    return null;
  }

  /**
   * Declare that this registry will be providing a icon for this name
   * @param {string} iconName the name of the icon to be provided.
   */
  protected provideIcon(iconName: string): UUIIconHost {
    return (this.icons[iconName] = new UUIIconHost());
  }

  /**
   * extend this method to provide your own logic.
   * @param iconName
   * @returns
   */
  // eslint-disable-next-line
  protected acceptIcon(_iconName: string): boolean {
    return false;
  }

  public getIconNames(): string[] {
    return Object.keys(this.icons);
  }
}
