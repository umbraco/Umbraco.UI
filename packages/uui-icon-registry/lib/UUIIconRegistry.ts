import { UUIIconHost } from './UUIIconHost';

export class UUIIconRegistry {
  private icons: Record<string, UUIIconHost> = {};

  public defineIcon(iconName: string, svgString: string) {
    if (this.icons[iconName]) {
      this.icons[iconName].svg = svgString;
      return;
    }
    this.icons[iconName] = new UUIIconHost(svgString);
  }

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
