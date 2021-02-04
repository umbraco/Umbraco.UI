import { UUIIconHost } from './UUIIconHost';

export class UUIIconFactory {
  private static Icons: Record<string, UUIIconHost> = {};

  public static DefineIcon(iconName: string, svgString: string) {
    if (UUIIconFactory.Icons[iconName]) {
      UUIIconFactory.Icons[iconName].svg = svgString;
    }
    UUIIconFactory.Icons[iconName] = new UUIIconHost(svgString);
  }

  public static GetIcon(iconName: string): Promise<string> {
    if (UUIIconFactory.Icons[iconName]) {
      return UUIIconFactory.Icons[iconName].getPromise();
    } else {
      const icon = new UUIIconHost();
      UUIIconFactory.Icons[iconName] = icon;

      // TODO: Missing event to let icon service react to the request of a new icon.

      return icon.getPromise();
    }
  }
}
