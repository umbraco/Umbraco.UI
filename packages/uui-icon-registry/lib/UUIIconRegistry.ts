import { UUIIconHost } from './UUIIconHost';

export class UUIIconRegistry {
  private icons: Record<string, UUIIconHost> = {};

  public defineIcon(iconName: string, svgString: string) {
    if (this.icons[iconName]) {
      this.icons[iconName].svg = svgString;
    }
    this.icons[iconName] = new UUIIconHost(svgString);
  }

  public getIcon(iconName: string): Promise<string> | null {
    if (this.icons[iconName]) {
      return this.icons[iconName].promise;
    }
    return null;
  }

  /**
   * Dynamic concept by extending this class:
   * extend getIcon in this way:

    public getIcon(iconName: string): Promise<string> | null {

      // If we already have it cached then we will use that.
      let icon = super.getIcon(iconName);

      // If not we will check if this is something we want to provide.
      if(icon === null) {

        // If iconName is good to be provided by this, then create a new UUIIconHost set it on the icon-variable.
        // Load this icon as well.

        if(icon !== null) {
          this.icons[iconName] = icon;
          return icon.promise;
        }
      }
      return icon;
    }

   */

  protected loadIcon(iconName?: string): UUIIconHost | null {
    //const icon = new UUIIconHost();
    return iconName ? null : null;
  }

  public getIconNames(): string[] {
    return Object.keys(this.icons);
  }
}
