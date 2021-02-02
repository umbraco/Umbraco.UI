export class UUIIconFactory {
  private static Promises: Record<string, Promise<string>> = {};

  public static DefineIcon(iconName: string, svgString: string) {
    if (UUIIconFactory.Promises[iconName]) {
      //throw error?
    }
    UUIIconFactory.Promises[iconName] = Promise.resolve(svgString);
  }

  public static GetIcon(iconName: string): Promise<string> | null {
    if (UUIIconFactory.Promises[iconName]) {
      return UUIIconFactory.Promises[iconName];
    } else {
      return null;
    }
  }
}
