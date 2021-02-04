export class UUIIconHost {
  public promise: Promise<string>;
  private resolve: any;

  constructor(svg?: string) {
    this.promise = new Promise<string>((resolveMethod, reject) => {
      this.resolve = resolveMethod;
    });

    if (svg) {
      this.resolve(svg);
    }
  }

  public set svg(svg: string) {
    this.resolve(svg);
  }

  public getPromise(): Promise<string> {
    return this.promise;
  }
}
