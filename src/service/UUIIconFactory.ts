import { UUIIcon } from './UUIIcon';

export class UUIIconFactory {
  private static Promises: Record<string, UUIIcon> = {};

  public static DefineIcon(iconName: string, svgString: string) {
    if (UUIIconFactory.Promises[iconName]) {
      UUIIconFactory.Promises[iconName].svg = svgString;
    }
    UUIIconFactory.Promises[iconName] = new UUIIcon(svgString);
  }

  public static GetIcon(iconName: string): Promise<string> {
    if (UUIIconFactory.Promises[iconName]) {
      return UUIIconFactory.Promises[iconName].getPromise();
    } else {
      const promise = new UUIIcon();
      UUIIconFactory.Promises[iconName] = promise;

      // TODO: Missing event to let icon service react to the request of a new icon.

      return promise.getPromise();
    }
  }
}
