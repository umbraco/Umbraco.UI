import { UUIIconRequestEvent } from '@umbraco-ui/uui-icon/lib';

import { UUIIconHost } from './UUIIconHost';

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
  //@ts-ignore-start
  // eslint-disable-next-line
  protected acceptIcon(iconName: string): boolean {
    return false;
  }
  //@ts-ignore-end

  /**
   * Dynamic concept by extending this class:
   * extend getIcon in this way:

    protected acceptIcon(iconName: string): boolean {

      // Check if this is something we want to accept and provide.
      if(iconName === "myCustomIcon") {

        // Inform that we will be providing this.
        const icon = this.provideIcon(iconName);

        // When data is available set it on this icon object, this can be done at any point in time:
        icon.svg = "...";

        return true;
      }

      return false;
    }
  */

  public getIconNames(): string[] {
    return Object.keys(this.icons);
  }
}
